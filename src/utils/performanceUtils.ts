import React from 'react';

// 性能测量工具类
export class PerformanceTracker {
  private startTime: number = 0;
  private endTime: number = 0;
  private observations: PerformanceObserver | null = null;
  private metrics: PerformanceMetrics = {
    renderTime: 0,
    paintTime: 0,
    layoutTime: 0,
    memoryUsage: 0,
    styleRecalcTime: 0,
    totalTime: 0,
  };

  constructor() {
    this.initPerformanceObserver();
  }

  private initPerformanceObserver() {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        this.observations = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.entryType === 'measure') {
              this.metrics.totalTime += entry.duration;
            } else if (entry.entryType === 'paint') {
              if (entry.name === 'first-contentful-paint') {
                this.metrics.paintTime = entry.startTime;
              }
            } else if (entry.entryType === 'layout-shift') {
              this.metrics.layoutTime += entry.duration || 0;
            }
          });
        });

        this.observations.observe({ entryTypes: ['measure', 'paint', 'layout-shift'] });
      } catch (error) {
        console.warn('Performance Observer not supported', error);
      }
    }
  }

  startMeasuring(label: string = 'performance-test') {
    this.startTime = performance.now();
    if (typeof performance.mark === 'function') {
      performance.mark(`${label}-start`);
    }
  }

  endMeasuring(label: string = 'performance-test') {
    this.endTime = performance.now();
    if (typeof performance.mark === 'function' && typeof performance.measure === 'function') {
      performance.mark(`${label}-end`);
      performance.measure(label, `${label}-start`, `${label}-end`);
    }

    this.metrics.renderTime = this.endTime - this.startTime;
    return this.metrics.renderTime;
  }

  async getMemoryUsage(): Promise<number> {
    if ('memory' in performance) {
      const memInfo = (performance as any).memory;
      return memInfo.usedJSHeapSize / 1024 / 1024; // Convert to MB
    }
    return 0;
  }

  async measureStyleRecalculation(): Promise<number> {
    const startTime = performance.now();

    // 强制样式重计算
    if (typeof document !== 'undefined') {
      const element = document.createElement('div');
      element.style.cssText = 'width: 100px; height: 100px; background: red;';
      document.body.appendChild(element);

      // 触发样式重计算
      element.offsetHeight;

      document.body.removeChild(element);
    }

    const endTime = performance.now();
    this.metrics.styleRecalcTime = endTime - startTime;
    return this.metrics.styleRecalcTime;
  }

  async getAllMetrics(): Promise<PerformanceMetrics> {
    this.metrics.memoryUsage = await this.getMemoryUsage();
    await this.measureStyleRecalculation();
    return { ...this.metrics };
  }

  reset() {
    this.metrics = {
      renderTime: 0,
      paintTime: 0,
      layoutTime: 0,
      memoryUsage: 0,
      styleRecalcTime: 0,
      totalTime: 0,
    };
  }

  disconnect() {
    if (this.observations) {
      this.observations.disconnect();
    }
  }
}

export interface PerformanceMetrics {
  renderTime: number;
  paintTime: number;
  layoutTime: number;
  memoryUsage: number;
  styleRecalcTime: number;
  totalTime: number;
}

// React Hook for performance measurement
export const useAdvancedPerformance = (componentName: string) => {
  const [metrics, setMetrics] = React.useState<PerformanceMetrics | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const trackerRef = React.useRef<PerformanceTracker | null>(null);

  React.useEffect(() => {
    const tracker = new PerformanceTracker();
    trackerRef.current = tracker;

    tracker.startMeasuring(componentName);

    const measurePerformance = async () => {
      // 等待组件完全渲染
      await new Promise((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(resolve);
        });
      });

      tracker.endMeasuring(componentName);
      const allMetrics = await tracker.getAllMetrics();
      setMetrics(allMetrics);
      setIsLoading(false);
    };

    measurePerformance();

    return () => {
      tracker.disconnect();
    };
  }, [componentName]);

  return { metrics, isLoading };
};

// 批量性能测试工具
export class BatchPerformanceTest {
  private results: { [key: string]: PerformanceMetrics[] } = {};

  async runTest(testName: string, testFunction: () => Promise<void>, iterations: number = 5): Promise<PerformanceMetrics> {
    const results: PerformanceMetrics[] = [];

    for (let i = 0; i < iterations; i++) {
      const tracker = new PerformanceTracker();
      tracker.startMeasuring(testName);

      await testFunction();

      tracker.endMeasuring(testName);
      const metrics = await tracker.getAllMetrics();
      results.push(metrics);
      tracker.disconnect();

      // 短暂延迟，让浏览器清理
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    this.results[testName] = results;
    return this.calculateAverageMetrics(results);
  }

  private calculateAverageMetrics(results: PerformanceMetrics[]): PerformanceMetrics {
    const avg = results.reduce(
      (acc, curr) => {
        return {
          renderTime: acc.renderTime + curr.renderTime,
          paintTime: acc.paintTime + curr.paintTime,
          layoutTime: acc.layoutTime + curr.layoutTime,
          memoryUsage: acc.memoryUsage + curr.memoryUsage,
          styleRecalcTime: acc.styleRecalcTime + curr.styleRecalcTime,
          totalTime: acc.totalTime + curr.totalTime,
        };
      },
      {
        renderTime: 0,
        paintTime: 0,
        layoutTime: 0,
        memoryUsage: 0,
        styleRecalcTime: 0,
        totalTime: 0,
      }
    );

    const length = results.length;
    return {
      renderTime: avg.renderTime / length,
      paintTime: avg.paintTime / length,
      layoutTime: avg.layoutTime / length,
      memoryUsage: avg.memoryUsage / length,
      styleRecalcTime: avg.styleRecalcTime / length,
      totalTime: avg.totalTime / length,
    };
  }

  getResults() {
    return this.results;
  }

  compareResults(test1: string, test2: string): ComparisonResult | null {
    const results1 = this.results[test1];
    const results2 = this.results[test2];

    if (!results1 || !results2) {
      return null;
    }

    const avg1 = this.calculateAverageMetrics(results1);
    const avg2 = this.calculateAverageMetrics(results2);

    return {
      test1: test1,
      test2: test2,
      metrics1: avg1,
      metrics2: avg2,
      improvements: {
        renderTime: ((avg2.renderTime - avg1.renderTime) / avg2.renderTime) * 100,
        paintTime: ((avg2.paintTime - avg1.paintTime) / avg2.paintTime) * 100,
        layoutTime: ((avg2.layoutTime - avg1.layoutTime) / avg2.layoutTime) * 100,
        memoryUsage: ((avg2.memoryUsage - avg1.memoryUsage) / avg2.memoryUsage) * 100,
        styleRecalcTime: ((avg2.styleRecalcTime - avg1.styleRecalcTime) / avg2.styleRecalcTime) * 100,
        totalTime: ((avg2.totalTime - avg1.totalTime) / avg2.totalTime) * 100,
      },
    };
  }
}

export interface ComparisonResult {
  test1: string;
  test2: string;
  metrics1: PerformanceMetrics;
  metrics2: PerformanceMetrics;
  improvements: {
    renderTime: number;
    paintTime: number;
    layoutTime: number;
    memoryUsage: number;
    styleRecalcTime: number;
    totalTime: number;
  };
}

// 改进的性能测量钩子
export const usePerformanceMeasure = (componentName: string) => {
  const [renderTime, setRenderTime] = React.useState<number>(0);
  const [mountTime, setMountTime] = React.useState<number>(0);

  const startTimeRef = React.useRef<number>(0);
  const mountStartRef = React.useRef<number>(0);
  const isInitialized = React.useRef<boolean>(false);

  // 在组件首次渲染时记录开始时间
  if (!isInitialized.current) {
    startTimeRef.current = performance.now();
    mountStartRef.current = performance.now();
    isInitialized.current = true;
  }

  React.useEffect(() => {
    // 测量挂载时间（从组件开始渲染到 useEffect 执行）
    const mountEndTime = performance.now();
    setMountTime(mountEndTime - mountStartRef.current);

    // 使用 requestAnimationFrame 确保 DOM 完全更新后再测量
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const renderEndTime = performance.now();
        setRenderTime(renderEndTime - startTimeRef.current);
      });
    });
  }, []);

  return { renderTime, mountTime };
};
