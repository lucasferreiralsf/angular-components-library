import {
  AnimationTriggerMetadata,
  trigger,
  state,
  transition,
  style,
  animate,
  useAnimation
} from '@angular/animations';
import { bounceInRight, bounceOut } from 'ng-animate';

export const toastAnimations: {
  readonly fadeToast: AnimationTriggerMetadata;
  readonly bounceToast: AnimationTriggerMetadata;
} = {
  fadeToast: trigger('fadeAnimation', [
    state('in', style({ opacity: 1 })),
    transition('void => *', [style({ opacity: 0 }), animate('{{ fadeIn }}ms')]),
    transition(
      'default => closing',
      animate('{{ fadeOut }}ms', style({ opacity: 0 }))
    )
  ]),
  bounceToast: trigger('bounceInRightAnimation', [
    transition(
      'void => *',
      useAnimation(bounceInRight, {
        params: { timing: 0.6, delay: 0, a: '100px' }
      })
    ),
    transition(
      '* => closing',
      useAnimation(bounceOut, {
        params: { timing: 0.3, delay: 0 }
      })
    )
  ])
};

export type ToastAnimationState = 'default' | 'closing';
