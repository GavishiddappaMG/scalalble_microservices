import { animate, state, style, transition, trigger, query, stagger, group } from '@angular/animations';
export function routerTransition() {
  return scaleTransition();
}

export function slideToRight() {
  return trigger('routerTransition', [
    state('void', style({})),
    state('*', style({})),
    transition(':enter', [
      style({ transform: 'translateX(-100%)' }),
      animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
    ]),
    transition(':leave', [
      style({ transform: 'translateX(0%)' }),
      animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
    ])
  ]);
}

export function slideToLeft() {
  return trigger('routerTransition', [
    state('void', style({})),
    state('*', style({})),
    transition(':enter', [
      style({ transform: 'translateX(100%)' }),
      animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
    ]),
    transition(':leave', [
      style({ transform: 'translateX(0%)' }),
      animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
    ])
  ]);
}

export function slideToBottom() {
  return trigger('routerTransition', [
    state('void', style({})),
    state('*', style({})),
    transition(':enter', [
      style({ transform: 'translateY(-100%)' }),
      animate('0.5s ease-in-out', style({ transform: 'translateY(0%)' }))
    ]),
    transition(':leave', [
      style({ transform: 'translateY(0%)' }),
      animate('0.5s ease-in-out', style({ transform: 'translateY(100%)' }))
    ])
  ]);
}

export function widthTransition() {
  return trigger('routerTransition', [
    state('in', style({
      width: 300,
      transform: 'translateX(0)', opacity: 1
    })),
    transition('void => *', [
      style({ width: 10, transform: 'translateX(50px)', opacity: 0 }),
      group([
        animate('0.3s 0.1s ease', style({
          transform: 'translateX(0)',
          width: 300
        })),
        animate('0.3s ease', style({
          opacity: 1
        }))
      ])
    ]),
    transition('* => void', [
      group([
        animate('0.3s ease', style({
          transform: 'translateX(50px)',
          width: 10
        })),
        animate('0.3s 0.2s ease', style({
          opacity: 0
        }))
      ])
    ])
  ]);
}

export function scaleTransition() {
  return trigger('routerTransition', [
    state('in', style({
      transform: 'scale(1.5)', opacity: 1
    })),
    transition('void <=> *', [
      style({ transform: 'scale(1.5)', opacity: 0 }),
      group([
        animate('0.3s 0.1s ease', style({
          transform: 'scale(1)'
        })),
        animate('0.3s ease', style({
          opacity: 1
        }))
      ])
    ])
  ]);
}