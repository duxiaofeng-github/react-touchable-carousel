var e,t=(e=require("react"))&&"object"==typeof e&&"default"in e?e.default:e,i=require("react-swipeable"),n=4;function r(e){return Math.round(3*e)}function l(e){return e<.3}exports.Carousel=function(e){function o(t){var i=this;e.call(this,t),this.wrapperEls=[],this.currentIndex=0,this.left=0,this.handleSwiping=function(e){if(null==i.sliderWidth&&(i.sliderWidth=i.getSliderWidth()),!1!==i.sliderWidth&&l(e.velocity)){i.clearAutoPlayTimer(),null==i.originLeft&&(i.originLeft=i.left);var t=i.originLeft-e.deltaX,n=i.sliderWidth,r=n.containerElWidth-n.innerElWidth;i.left=t>0?0:t<r?r:t,i.setState({left:i.left,disableTransition:!0})}},this.handleSwiped=function(e){var t=i.sliderWidth;if(null!=i.sliderWidth&&(i.sliderWidth=void 0),!1!==t&&l(e.velocity)){i.resetAutoPlayTimer(),i.originLeft=void 0;for(var n=i.wrapperEls.length,r=0,o=0;o<n;o++){var a=i.wrapperEls[o];if(a){var s=a.getBoundingClientRect().width+i.getPadding();if(-(r+=s)<i.left){i.slideToNIndex({index:r+i.left<s/2?o+1:o,disableTransition:!1});break}}}}},this.handleSwipedLeft=function(e){if(!l(e.velocity)){var t=null!=i.props.itemsPerSwipe?i.props.itemsPerSwipe:r(e.velocity),n=i.currentIndex+t,o=n>i.wrapperEls.length-1?i.wrapperEls.length-1:n;i.resetAutoPlayTimer(),i.slideToNIndex({index:o,cb:i.resetIndex})}},this.handleSwipedRight=function(e){if(!l(e.velocity)){var t=null!=i.props.itemsPerSwipe?i.props.itemsPerSwipe:r(e.velocity),n=i.currentIndex-t,o=n<0?0:n;i.resetAutoPlayTimer(),i.slideToNIndex({index:o,cb:i.resetIndex})}},this.resetIndex=function(){i.props.infinite&&(clearTimeout(i.resetIndexTimer),i.resetIndexTimer=setTimeout(function(){if(Array.isArray(i.props.children)){var e=i.props.children.length,t=i.currentIndex%e+e*n;t!==i.currentIndex&&i.slideToIndexWithoutTransition(t)}},500))},this.slideToNIndex=function(e){var t=e.index,n=e.cb,r=e.disableTransition,l=i.getSliderWidth();if(!1!==l){for(var o,a=l.containerElWidth-l.innerElWidth,s=0,d=0;d<t;d++){var p=i.wrapperEls[d];if(p&&-(s+=p.getBoundingClientRect().width+i.getPadding())<a){o=d+1;break}}i.left=null!=o?a:-s,i.maxIndex=o,i.currentIndex=null!=o?o:t,i.setState({left:i.left,disableTransition:null!=r&&r},n)}},this.state={left:0,disableTransition:!1}}return e&&(o.__proto__=e),(o.prototype=Object.create(e&&e.prototype)).constructor=o,o.prototype.componentDidMount=function(){this.init()},o.prototype.init=function(){var e=this;if(Array.isArray(this.props.children)){if(this.props.infinite){var t=this.props.children.length;setTimeout(function(){e.slideToIndexWithoutTransition(t*n)},3e3)}this.resetAutoPlayTimer()}},o.prototype.render=function(){var e=this,r=this.props,l=r.children,o=r.infinite,a=r.disableSlowSwipe,s=r.className,d=r.classNameInner,p=r.align;if(void 0===p&&(p="center"),!Array.isArray(l))return null;var h=o?[]:l;if(o)for(var u=0;u<2*n+1;u++)h.push.apply(h,l);var c=this.getPadding(),f=h.length;return t.createElement(i.Swipeable,{preventDefaultTouchmoveEvent:!0,onSwiping:a?void 0:this.handleSwiping,onSwiped:a?void 0:this.handleSwiped,onSwipedLeft:this.handleSwipedLeft,onSwipedRight:this.handleSwipedRight},t.createElement("div",{className:s,ref:function(t){return e.containerEl=t},style:{overflow:"hidden"}},t.createElement("div",{className:d,ref:function(t){return e.innerEl=t},style:{float:"left",display:"flex",flexWrap:"nowrap",alignItems:"top"===p?"flex-start":"center"===p?"center":"flex-end",transform:"translateX("+this.state.left+"px)",transition:this.state.disableTransition?"none":"transform 0.5s ease-out"}},h.map(function(i,n){return t.createElement("div",{key:n,style:{display:"flex",marginRight:n!==f-1?c||10:0},ref:function(t){e.wrapperEls[n]=t}},i)})),t.createElement("div",{style:{clear:"both",height:0}})))},o.prototype.getPadding=function(){return null!=this.props.padding?this.props.padding:10},o.prototype.getSliderWidth=function(){if(null==this.innerEl||null==this.containerEl)return!1;var e=this.innerEl.getBoundingClientRect().width,t=this.containerEl.getBoundingClientRect().width;return!(e<t)&&{innerElWidth:e,containerElWidth:t}},o.prototype.slideToIndexWithoutTransition=function(e){this.slideToNIndex({index:e,disableTransition:!0})},o.prototype.clearAutoPlayTimer=function(){clearInterval(this.autoPlayTimer)},o.prototype.resetAutoPlayTimer=function(){var e=this;this.props.autoPlay&&(this.clearAutoPlayTimer(),this.autoPlayTimer=setInterval(function(){e.slideToNIndex(null==e.maxIndex?{index:e.currentIndex+1}:{index:0})},Math.round(1e3*(this.props.autoPlayDuration||3))))},o}(t.Component);
//# sourceMappingURL=index.js.map