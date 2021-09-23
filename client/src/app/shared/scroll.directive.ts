import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { TagKeys } from '../news/shared/constants';

@Directive({
  selector: '[scrollTracker]',
})
export class ScrollTrackerDirective {
  @Output() someEvent = new EventEmitter<any>();
  public scroll = false;
  private lastDiff: number = 0;
  @HostListener('window:mousewheel', ['$event']) onMousewheel(event: any) {
    if (event.wheelDelta < 0) {
      const pos =
        (document.documentElement.scrollTop || document.body.scrollTop) +
        document.documentElement.offsetHeight;
      const max = document.documentElement.scrollHeight;
      const diff = pos - max - 100;

      if (!(this.scroll && diff < 0 && diff - this.lastDiff < 10)) {
        this.scroll = false;
        this.someEvent.emit({ action: TagKeys.load });
      }
    }
  }
}
