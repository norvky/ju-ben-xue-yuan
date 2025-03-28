/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by vite-plugin-uni-pages

interface NavigateToOptions {
  url: "/pages/redirectPage/redirectPage" |
       "/pages/home/home" |
       "/pages/about/about" |
       "/pages/index/index" |
       "/pages/login/login" |
       "/pages/personal/personal" |
       "/pages/screenplay/screenplay" |
       "/pages/screenplay/widget" |
       "/pages/home/mapControls/mapControls" |
       "/pages/home/mapControls/ExchangeBadgesControl/index" |
       "/pages/home/mapControls/LookAroundControl/index" |
       "/pages/home/mapControls/PersonalControl/index" |
       "/pages/home/mapControls/ScanControl/index" |
       "/pages/home/mapControls/TaskControl/index";
}
interface RedirectToOptions extends NavigateToOptions {}

interface SwitchTabOptions {
  url: "/pages/home/home" | "/pages/personal/personal"
}

type ReLaunchOptions = NavigateToOptions | SwitchTabOptions;

declare interface Uni {
  navigateTo(options: UniNamespace.NavigateToOptions & NavigateToOptions): void;
  redirectTo(options: UniNamespace.RedirectToOptions & RedirectToOptions): void;
  switchTab(options: UniNamespace.SwitchTabOptions & SwitchTabOptions): void;
  reLaunch(options: UniNamespace.ReLaunchOptions & ReLaunchOptions): void;
}
