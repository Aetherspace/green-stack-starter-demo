import React, { ComponentProps } from 'react';
import { View, Pressable } from 'react-native';
interface AetherPressableType extends ComponentProps<typeof Pressable> {
    style?: ComponentProps<typeof Pressable>['style'];
    tw?: string | (string | null | undefined | false | 0)[];
    twID?: string;
}
declare const _default: React.ForwardRefExoticComponent<Pick<AetherPressableType, "style" | "tw" | "children" | "hitSlop" | "onLayout" | "pointerEvents" | "removeClippedSubviews" | "testID" | "nativeID" | "collapsable" | "needsOffscreenAlphaCompositing" | "renderToHardwareTextureAndroid" | "focusable" | "shouldRasterizeIOS" | "isTVSelectable" | "hasTVPreferredFocus" | "tvParallaxProperties" | "tvParallaxShiftDistanceX" | "tvParallaxShiftDistanceY" | "tvParallaxTiltAngle" | "tvParallaxMagnification" | "onStartShouldSetResponder" | "onMoveShouldSetResponder" | "onResponderEnd" | "onResponderGrant" | "onResponderReject" | "onResponderMove" | "onResponderRelease" | "onResponderStart" | "onResponderTerminationRequest" | "onResponderTerminate" | "onStartShouldSetResponderCapture" | "onMoveShouldSetResponderCapture" | "onTouchStart" | "onTouchMove" | "onTouchEnd" | "onTouchCancel" | "onTouchEndCapture" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityState" | "accessibilityHint" | "accessibilityValue" | "onAccessibilityAction" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "twID" | "onPress" | "onLongPress" | "onPressIn" | "onPressOut" | "onBlur" | "onFocus" | "delayLongPress" | "disabled" | "pressRetentionOffset" | "android_disableSound" | "android_ripple" | "testOnly_pressed" | "key"> & React.RefAttributes<View>> & {
    TYPE: AetherPressableType;
};
export default _default;
