import React, { useState } from 'react';
import './index.css';

export default function BEMPage() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleCardClick = (cardId: number) => {
    setSelectedCard(selectedCard === cardId ? null : cardId);
  };

  return (
    <div className='bem-page'>
      <h1 className='bem-page__title'>
        <span className='bem-page__title--highlighted'>BEM</span> 样式规范指南
      </h1>

      {/* BEM介绍部分 */}
      <section className='bem-introduction'>
        <h2 className='bem-introduction__title'>什么是 BEM？</h2>
        <p className='bem-introduction__description'>
          BEM（Block Element Modifier）是一种CSS命名方法论，它提供了一种清晰、结构化的方式来编写可维护的CSS代码。
          BEM的核心思想是将界面分解为独立的块（Block），这些块由元素（Element）组成，并通过修饰符（Modifier）来改变其外观或行为。
        </p>

        <div className='bem-introduction__benefits'>
          <div className='bem-introduction__benefit'>
            <span className='bem-introduction__benefit-icon'>🎯</span>
            <h3 className='bem-introduction__benefit-title'>结构清晰</h3>
            <p className='bem-introduction__benefit-text'>通过明确的命名约定，让CSS类名具有语义化和可读性</p>
          </div>
          <div className='bem-introduction__benefit'>
            <span className='bem-introduction__benefit-icon'>🔧</span>
            <h3 className='bem-introduction__benefit-title'>易于维护</h3>
            <p className='bem-introduction__benefit-text'>模块化的结构使得样式修改和维护变得更加简单</p>
          </div>
          <div className='bem-introduction__benefit'>
            <span className='bem-introduction__benefit-icon'>👥</span>
            <h3 className='bem-introduction__benefit-title'>团队协作</h3>
            <p className='bem-introduction__benefit-text'>统一的命名规范有助于团队成员之间的代码理解和协作</p>
          </div>
          <div className='bem-introduction__benefit'>
            <span className='bem-introduction__benefit-icon'>⚡</span>
            <h3 className='bem-introduction__benefit-title'>避免冲突</h3>
            <p className='bem-introduction__benefit-text'>独特的命名方式有效避免了CSS样式冲突和覆盖问题</p>
          </div>
        </div>
      </section>

      {/* BEM规范详解 */}
      <section className='bem-rules'>
        <div className='bem-rules__item bem-rules__item--block'>
          <h3 className='bem-rules__title'>块（Block）</h3>
          <p className='bem-rules__description'>
            块是一个独立的页面组件，可以在任何地方复用。块名应该描述其用途（它是什么），而不是其状态（它看起来像什么）。
          </p>
          <pre className='bem-rules__example'>
            {`.header { }
.menu { }
.button { }
.card { }`}
          </pre>
        </div>

        <div className='bem-rules__item bem-rules__item--element'>
          <h3 className='bem-rules__title'>元素（Element）</h3>
          <p className='bem-rules__description'>
            元素是块的一部分，没有独立的意义，在语义上与其块相关联。元素名用双下划线（__）与块名分隔。
          </p>
          <pre className='bem-rules__example'>
            {`.header__logo { }
.menu__item { }
.button__text { }
.card__title { }`}
          </pre>
        </div>

        <div className='bem-rules__item bem-rules__item--modifier'>
          <h3 className='bem-rules__title'>修饰符（Modifier）</h3>
          <p className='bem-rules__description'>
            修饰符是用来改变块或元素外观或行为的标志。修饰符名用双连字符（--）与块名或元素名分隔。
          </p>
          <pre className='bem-rules__example'>
            {`.button--primary { }
.button--large { }
.menu__item--active { }
.card--featured { }`}
          </pre>
        </div>
      </section>

      {/* 学习资源 */}
      <section className='bem-resources'>
        <h2 className='bem-resources__title'>学习资源和文档</h2>
        <div className='bem-resources__grid'>
          <a href='https://getbem.com/' target='_blank' rel='noopener noreferrer' className='bem-resources__item'>
            <h3 className='bem-resources__item-title'>BEM 官方网站</h3>
            <p className='bem-resources__item-description'>BEM方法论的官方介绍和完整文档，包含详细的规范说明和最佳实践。</p>
            <span className='bem-resources__item-link'>访问官网 →</span>
          </a>

          <a href='https://en.bem.info/methodology/' target='_blank' rel='noopener noreferrer' className='bem-resources__item'>
            <h3 className='bem-resources__item-title'>BEM 方法论详解</h3>
            <p className='bem-resources__item-description'>深入了解BEM的核心概念、原则和实际应用场景。</p>
            <span className='bem-resources__item-link'>深入学习 →</span>
          </a>

          <a href='https://css-tricks.com/bem-101/' target='_blank' rel='noopener noreferrer' className='bem-resources__item'>
            <h3 className='bem-resources__item-title'>CSS-Tricks BEM 教程</h3>
            <p className='bem-resources__item-description'>CSS-Tricks上的BEM入门教程，通俗易懂的实例讲解。</p>
            <span className='bem-resources__item-link'>查看教程 →</span>
          </a>
        </div>
      </section>

      {/* 实际案例演示 */}
      <section className='bem-demo'>
        <h2 className='bem-demo__title'>BEM 实际案例演示</h2>
        <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666' }}>
          以下卡片组件完全使用BEM命名规范构建，点击卡片查看交互效果
        </p>

        {/* 演示卡片 */}
        <div className='card'>
          <div className='card__header'>
            <h3 className='card__title'>普通卡片</h3>
            <p className='card__subtitle'>这是一个基础的卡片组件</p>
          </div>
          <div className='card__body'>
            <p className='card__content'>
              这个卡片使用了标准的BEM命名规范：card（块）、card__header（元素）、card__title（元素）等。
              这种命名方式让样式结构非常清晰，易于理解和维护。
            </p>
          </div>
          <div className='card__footer'>
            <button className='card__action' onClick={() => handleCardClick(1)}>
              点击测试
            </button>
            <button className='card__action card__action--secondary'>次要操作</button>
          </div>
        </div>

        <div className='card card--featured'>
          <div className='card__header card__header--success'>
            <h3 className='card__title'>特色卡片</h3>
            <p className='card__subtitle'>使用了修饰符的卡片变体</p>
          </div>
          <div className='card__body'>
            <p className='card__content'>
              这个卡片使用了 card--featured 修饰符来改变其外观。 同时，头部使用了 card__header--success
              修饰符来应用成功状态的样式。
              {selectedCard === 2 && ' 🎉 你点击了特色卡片！'}
            </p>
          </div>
          <div className='card__footer'>
            <button className='card__action' onClick={() => handleCardClick(2)}>
              {selectedCard === 2 ? '已选中' : '选择此卡片'}
            </button>
            <button className='card__action card__action--secondary'>了解更多</button>
          </div>
        </div>

        <div className='card'>
          <div className='card__header card__header--warning'>
            <h3 className='card__title'>警告卡片</h3>
            <p className='card__subtitle'>带有警告状态的卡片</p>
          </div>
          <div className='card__body'>
            <p className='card__content'>
              这个卡片展示了如何使用修饰符来创建不同的状态变体。 card__header--warning 修饰符给头部应用了警告色彩的样式。
              {selectedCard === 3 && ' ⚠️ 注意：这是一个警告卡片！'}
            </p>
          </div>
          <div className='card__footer'>
            <button className='card__action' onClick={() => handleCardClick(3)}>
              {selectedCard === 3 ? '已确认' : '确认警告'}
            </button>
            <button className='card__action card__action--secondary'>忽略</button>
          </div>
        </div>
      </section>

      {/* 代码对比展示 */}
      <section className='bem-code-display'>
        <div className='bem-code-display__section'>
          <h3 className='bem-code-display__title'>HTML 结构</h3>
          <div className='bem-code-display__code'>
            {`<div class="card card--featured">
  <div class="card__header card__header--success">
    <h3 class="card__title">特色卡片</h3>
    <p class="card__subtitle">副标题</p>
  </div>
  <div class="card__body">
    <p class="card__content">内容文本</p>
  </div>
  <div class="card__footer">
    <button class="card__action">主要操作</button>
    <button class="card__action card__action--secondary">
      次要操作
    </button>
  </div>
</div>`}
          </div>
        </div>

        <div className='bem-code-display__section'>
          <h3 className='bem-code-display__title'>CSS 样式</h3>
          <div className='bem-code-display__code'>
            {`/* 块（Block） */
.card { }

/* 元素（Element） */
.card__header { }
.card__title { }
.card__body { }
.card__footer { }
.card__action { }

/* 修饰符（Modifier） */
.card--featured { }
.card__header--success { }
.card__action--secondary { }`}
          </div>
        </div>
      </section>

      {/* 总结部分 */}
      <section className='bem-introduction' style={{ marginTop: '40px' }}>
        <h2 className='bem-introduction__title'>BEM 最佳实践总结</h2>
        <div className='bem-introduction__benefits'>
          <div className='bem-introduction__benefit'>
            <span className='bem-introduction__benefit-icon'>📝</span>
            <h3 className='bem-introduction__benefit-title'>命名规范</h3>
            <p className='bem-introduction__benefit-text'>使用小写字母和连字符，避免使用驼峰命名法</p>
          </div>
          <div className='bem-introduction__benefit'>
            <span className='bem-introduction__benefit-icon'>🎯</span>
            <h3 className='bem-introduction__benefit-title'>语义化</h3>
            <p className='bem-introduction__benefit-text'>类名应该描述用途和功能，而不是外观</p>
          </div>
          <div className='bem-introduction__benefit'>
            <span className='bem-introduction__benefit-icon'>🔄</span>
            <h3 className='bem-introduction__benefit-title'>可复用</h3>
            <p className='bem-introduction__benefit-text'>设计可在不同上下文中复用的独立组件</p>
          </div>
          <div className='bem-introduction__benefit'>
            <span className='bem-introduction__benefit-icon'>⚖️</span>
            <h3 className='bem-introduction__benefit-title'>保持一致</h3>
            <p className='bem-introduction__benefit-text'>在整个项目中保持命名规范的一致性</p>
          </div>
        </div>
      </section>
    </div>
  );
}
