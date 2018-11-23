import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

const items = [
  {
    src:
      'https://1.bp.blogspot.com/--F0LykPxeko/WX9z1uABMGI/AAAAAAAAt4I/ONG2NnWNokMXnUM-bB8q72wZuu-uAYHDgCLcBGAs/s728-e100/game-of-thrones-season-full-download.png'
  },
  {
    src:
      'http://www.bucurestifm.ro/wp-content/uploads/sites/2/2016/09/Game-of-Thrones.jpg?w=640'
  },
  {
    src:
      'https://imgix.bustle.com/uploads/image/2018/8/31/aeaf01ae-cf0a-4efe-9e92-e81173ba4810-landscape-1504189659-04-20-gameofthrones-s07.jpg'
  }
];

class Carousal extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map(item => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img id="image_carousal" src={item.src} alt={item.altText} />
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={this.goToIndex}
        />
        {slides}
      </Carousel>
    );
  }
}

export default Carousal;
