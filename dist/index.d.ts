import React from "react";
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
export declare class Carousel extends React.Component<IProps, IState> {
    private containerEl?;
    private innerEl?;
    private wrapperEls;
    currentIndex: number;
    private left;
    private maxIndex?;
    private autoPlayTimer?;
    private resetIndexTimer?;
    private sliderWidth?;
    private originLeft?;
    constructor(props: IProps);
    componentDidMount(): void;
    init(): void;
    render(): JSX.Element | null;
    private getPadding;
    private handleSwiping;
    private handleSwiped;
    private handleSwipedLeft;
    private handleSwipedRight;
    private getSliderWidth;
    private resetIndex;
    slideToNIndex: (options: {
        index: number;
        cb?: (() => void) | undefined;
        disableTransition?: boolean | undefined;
    }) => void;
    slideToIndexWithoutTransition(index: number): void;
    clearAutoPlayTimer(): void;
    resetAutoPlayTimer(): void;
}
export {};
