/**
 * A Tweak is a "mutable number"—a value that coerces to a number in most
 * contexts but can be mutated at runtime to allow for easy experimentation.
 * For more information, see the {@link tweak} function.
 */
export type Tweak = number & _Tweak;
interface _Tweak {
    get(): number;
    set(v: number): void;
    valueOf(): number;
    toString(): string;
    [Symbol.toPrimitive](hint: "number" | "string" | "default"): number | string;
    onChange(func: OnTweakChangeFn): void;
    initial: number;
    name: string;
    min: number;
    max: number;
    step: number;
}
export interface TweakOptions {
    /**
     * The minimum value for the Tweak's slider. Defaults to 0.
     */
    min?: number;
    /**
     * The maximum value for the Tweak's slider. Defaults to 100.
     */
    max?: number;
    /**
     * The step value for the Tweak's slider. Defaults to 1.
     */
    step?: number;
    /**
     * The Tweaks object to attach the Tweak to. Defaults to `globalTweaks`.
     */
    tweaksObject?: Tweaks;
}
export type OnTweakChangeFn = (newValue: number) => void;
/**
 * Creates a `Tweak` and adds UI for it to be modified.
 *
 * A Tweak is a "mutable number"—a value that coerces to a number in most
 * contexts but can be mutated at runtime to allow for easy experimentation.
 * Tweaks are automatically registered into a global {@link Tweaks} object and
 * given UI for changing its value. The experience is inspired by
 * [Dear ImGui](https://github.com/ocornut/imgui).
 *
 * A Tweak can be created using the {@link tweak} function:
 *
 *     const TWEAKY_CONSTANT = tweak("Tweak Name", 3);
 *
 * This will create a Tweak with an initial value of 3, which can be used
 * anywhere a numeric constant would be used. Other options are available via
 * an optional third parameter, such as the ability to control the min and max
 * values or to register the Tweak with a different Tweaks object. See
 * {@link TweakOptions} for details.
 *
 * Two more steps are required to set your project up for tweaks:
 *
 * 1. Add the Tweaks UI to your page:
 *
 *        document.querySelector("body").appendChild(window.tweaks.container);
 *
 * 2. Listen for changes to Tweaks and refresh your app accordingly:
 *
 *        window.addEventListener("tweak", () => {
 *          updateAll();
 *        });
 *
 * Tweaks use `valueOf` and `Symbol.toPrimitive` so that they behave like
 * numbers when used in expressions. We do some TypeScript shenanigans to allow
 * the Tweak type to be used anywhere numbers are used. However, one big
 * annoyance is that exotic objects are always truthy, and the
 * [ToBoolean](https://262.ecma-international.org/8.0/#sec-toboolean) operation
 * doesn't allow for any hooks to modify this behavior. Attempting to use a
 * Tweak as a boolean value will therefore not work as expected. The easiest
 * workaround is to put a unary plus in front of the Tweak when using it, e.g.
 * `if (+DEBUG)`, in order to explicitly convert it to a number before
 * assessing its truthiness.
 */
export declare function tweak(name: string, initial: number, options?: TweakOptions): Tweak;
export interface TweaksOptions {
    /**
     * The HTML element to render Tweaks into.
     */
    container: HTMLElement;
}
export type OnTweakFn = (t: Tweak) => void;
/**
 * A collection of Tweaks. By default, Tweaks will be registered with the
 * pre-existing {@link globalTweaks} object, which dispatches a "tweak" event
 * to `window` whenever a value is tweaked. Most of the time you should use
 * that instead of creating a new Tweaks object yourself.
 *
 * Each instance of Tweaks requires an HTML element to render into; you are
 * responsible for placing this container somewhere in the DOM. Subscribe to
 * changes by calling {@link onTweak}.
 */
export declare class Tweaks {
    container: HTMLElement;
    tweaks: Tweak[];
    callbacks: OnTweakFn[];
    constructor(options: TweaksOptions);
    /**
     * Adds a Tweak to this object. Not intended to be called directly; instead,
     * just call {@link tweak} with the `tweaksObject` option.
     */
    add(tweak: Tweak): Tweak;
    onTweak(func: OnTweakFn): void;
}
/**
 * The default {@link Tweaks} object used by the {@link tweak} function.
 * Dispatches a "tweak" event to `window` whenever a value is tweaked. This
 * object can also be accessed via `window.tweaks`.
 */
export declare const globalTweaks: Tweaks;
export {};
