import React from "react";
import { Swipeable, EventData } from "react-swipeable";

export interface IProps {
  className?: string;
  classNameInner?: string;
  align?: "top" | "center" | "bottom";
  padding?: number;
  itemsPerSwipe?: number;
  autoPlay?: boolean;
  autoPlayDuration?: number;
  infinite?: boolean;
  disableSlowSwipe?: boolean;
}

interface IState {
  left: number;
  disableTransition: boolean;
}

const defaultPrependNumber = 4;

function getItemsCountByVelocity(velocity: number) {
  return Math.round(velocity * 3);
}

function isSlowSwipe(velocity: number) {
  return velocity < 0.3;
}

export class Carousel extends React.Component<IProps, IState> {
  private containerEl?: HTMLDivElement | null;
  private innerEl?: HTMLDivElement | null;
  private wrapperEls: (HTMLElement | null)[] = [];
  currentIndex = 0;
  private left = 0;
  private maxIndex?: number;
  private autoPlayTimer?: any;
  private resetIndexTimer?: any;
  private sliderWidth?: { innerElWidth: number; containerElWidth: number } | false;
  private originLeft?: number;

  constructor(props: IProps) {
    super(props);

    this.state = {
      left: 0,
      disableTransition: false,
    };
  }

  componentDidMount() {
    this.init();
  }

  init() {
    if (Array.isArray(this.props.children)) {
      if (this.props.infinite) {
        const childrenLength = this.props.children.length;

        // it could be refactor by other better algorithm
        setTimeout(() => {
          this.slideToIndexWithoutTransition(childrenLength * defaultPrependNumber);
        }, 3000);
      }

      this.resetAutoPlayTimer();
    }
  }

  render() {
    const { children, infinite, disableSlowSwipe, className, classNameInner, align = "center" } = this.props;
    if (!Array.isArray(children)) {
      return null;
    }

    const newChildren = !infinite ? children : [];

    if (infinite) {
      for (let i = 0; i < defaultPrependNumber * 2 + 1; i++) {
        newChildren.push(...children);
      }
    }

    const padding = this.getPadding();
    const childrenLength = newChildren.length;
    const alignItems = align === "top" ? "flex-start" : align === "center" ? "center" : "flex-end";

    return (
      <Swipeable
        preventDefaultTouchmoveEvent={true}
        onSwiping={!disableSlowSwipe ? this.handleSwiping : undefined}
        onSwiped={!disableSlowSwipe ? this.handleSwiped : undefined}
        onSwipedLeft={this.handleSwipedLeft}
        onSwipedRight={this.handleSwipedRight}
      >
        <div className={className} ref={(el) => (this.containerEl = el)} style={{ overflow: "hidden" }}>
          <div
            className={classNameInner}
            ref={(el) => (this.innerEl = el)}
            style={{
              float: "left",
              display: "flex",
              flexWrap: "nowrap",
              alignItems: alignItems,
              transform: `translateX(${this.state.left}px)`,
              transition: !this.state.disableTransition ? "transform 0.5s ease-out" : "none",
            }}
          >
            {newChildren.map((child, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    marginRight: index !== childrenLength - 1 ? padding || 10 : 0,
                  }}
                  ref={(el) => {
                    this.wrapperEls[index] = el;
                  }}
                >
                  {child}
                </div>
              );
            })}
          </div>
          <div style={{ clear: "both", height: 0 }} />
        </div>
      </Swipeable>
    );
  }

  private getPadding() {
    return this.props.padding != null ? this.props.padding : 10;
  }

  private handleSwiping = (data: EventData) => {
    if (this.sliderWidth == null) {
      this.sliderWidth = this.getSliderWidth();
    }

    if (this.sliderWidth === false) {
      return;
    }

    if (!isSlowSwipe(data.velocity)) {
      return;
    }

    this.clearAutoPlayTimer();

    if (this.originLeft == null) {
      this.originLeft = this.left;
    }

    const newLeft = this.originLeft - data.deltaX;
    const { innerElWidth, containerElWidth } = this.sliderWidth!;
    const minLeft = containerElWidth - innerElWidth;

    this.left = newLeft > 0 ? 0 : newLeft < minLeft ? minLeft : newLeft;
    this.setState({ left: this.left, disableTransition: true });
  };

  private handleSwiped = (data: EventData) => {
    const sliderWidth = this.sliderWidth;

    if (this.sliderWidth != null) {
      this.sliderWidth = undefined;
    }

    if (sliderWidth === false) {
      return;
    }

    if (!isSlowSwipe(data.velocity)) {
      return;
    }

    this.resetAutoPlayTimer();

    this.originLeft = undefined;

    const childrenLength = this.wrapperEls.length;
    let totalOffset = 0;

    for (let i = 0; i < childrenLength; i++) {
      const wrapperEl = this.wrapperEls[i];

      if (wrapperEl) {
        const elWidth = wrapperEl.getBoundingClientRect().width + this.getPadding();
        totalOffset += elWidth;

        if (-totalOffset < this.left) {
          const isMoreThanAHalf = totalOffset + this.left < elWidth / 2;
          const newIndex = isMoreThanAHalf ? i + 1 : i;

          this.slideToNIndex({ index: newIndex, disableTransition: false });

          break;
        }
      }
    }
  };

  private handleSwipedLeft = (data: EventData) => {
    if (isSlowSwipe(data.velocity)) {
      return;
    }

    const increasedIndex =
      this.props.itemsPerSwipe != null ? this.props.itemsPerSwipe : getItemsCountByVelocity(data.velocity);
    const index = this.currentIndex + increasedIndex;
    const forwardIndex = index > this.wrapperEls.length - 1 ? this.wrapperEls.length - 1 : index;

    this.resetAutoPlayTimer();
    this.slideToNIndex({ index: forwardIndex, cb: this.resetIndex });
  };

  private handleSwipedRight = (data: EventData) => {
    if (isSlowSwipe(data.velocity)) {
      return;
    }

    const increasedIndex =
      this.props.itemsPerSwipe != null ? this.props.itemsPerSwipe : getItemsCountByVelocity(data.velocity);
    const index = this.currentIndex - increasedIndex;
    const backToIndex = index < 0 ? 0 : index;

    this.resetAutoPlayTimer();
    this.slideToNIndex({ index: backToIndex, cb: this.resetIndex });
  };

  private getSliderWidth() {
    if (this.innerEl == null || this.containerEl == null) {
      return false;
    }

    const innerElWidth = this.innerEl.getBoundingClientRect().width;
    const containerElWidth = this.containerEl.getBoundingClientRect().width;

    if (innerElWidth < containerElWidth) {
      return false;
    }

    return { innerElWidth, containerElWidth };
  }

  private resetIndex = () => {
    if (!this.props.infinite) {
      return;
    }

    clearTimeout(this.resetIndexTimer);

    // waiting transition ended
    this.resetIndexTimer = setTimeout(() => {
      if (Array.isArray(this.props.children)) {
        const childrenLength = this.props.children.length;
        const originIndex = childrenLength * defaultPrependNumber;
        const newIndex = (this.currentIndex % childrenLength) + originIndex;

        if (newIndex !== this.currentIndex) {
          this.slideToIndexWithoutTransition(newIndex);
        }
      }
    }, 500);
  };

  slideToNIndex = (options: { index: number; cb?: () => void; disableTransition?: boolean }) => {
    const { index, cb, disableTransition } = options;
    const sliderWidth = this.getSliderWidth();
    if (sliderWidth === false) {
      return;
    }

    const { containerElWidth, innerElWidth } = sliderWidth;
    const minLeft = containerElWidth - innerElWidth;
    let totalOffset = 0;
    let maxIndex;

    for (let i = 0; i < index; i++) {
      const wrapperEl = this.wrapperEls[i];

      if (wrapperEl) {
        const elWidth = wrapperEl.getBoundingClientRect().width + this.getPadding();
        totalOffset += elWidth;

        if (-totalOffset < minLeft) {
          maxIndex = i + 1;

          break;
        }
      }
    }

    if (maxIndex != null) {
      this.left = minLeft;
    } else {
      this.left = -totalOffset;
    }

    this.maxIndex = maxIndex;
    this.currentIndex = maxIndex != null ? maxIndex : index;
    this.setState({ left: this.left, disableTransition: disableTransition != null ? disableTransition : false }, cb);
  };

  slideToIndexWithoutTransition(index: number) {
    this.slideToNIndex({
      index,
      disableTransition: true,
    });
  }

  clearAutoPlayTimer() {
    clearInterval(this.autoPlayTimer);
  }

  resetAutoPlayTimer() {
    if (!this.props.autoPlay) {
      return;
    }

    this.clearAutoPlayTimer();

    this.autoPlayTimer = setInterval(() => {
      if (this.maxIndex == null) {
        this.slideToNIndex({ index: this.currentIndex + 1 });
      } else {
        this.slideToNIndex({ index: 0 });
      }
    }, Math.round((this.props.autoPlayDuration || 3) * 1000));
  }
}
