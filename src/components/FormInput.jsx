import { useState } from "react";
// ✅ No CSS import needed anymore — all styling is Tailwind classes below

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { label, errorMessage, onChange, options, submitted, ...inputProps } = props;

  const isFocused = inputProps.value ? focused : false;

  const handleFocus = () => setFocused(true);

  const isEmpty = !inputProps.value || inputProps.value === "";
  const showRequiredError = submitted && inputProps.required && isEmpty;

  /*
    ─── TAILWIND CLASS EXPLANATIONS ───────────────────────────────

    WRAPPER div → "flex flex-col w-[280px] relative"
      flex          = display: flex
      flex-col      = flex-direction: column
      w-[280px]     = width: 280px   (custom value uses [ ])
      relative      = position: relative  (needed so eye-icon can use absolute)

    LABEL → "text-[15px] text-white/75"
      text-[15px]   = font-size: 15px   (custom)
      text-white/75 = color: white at 75% opacity  (/ means opacity)

    INPUT base → "w-full p-[15px] my-[10px] rounded border border-white/20 bg-white/[0.08] text-white box-border outline-none placeholder:text-white/30"
      w-full              = width: 100%
      p-[15px]            = padding: 15px
      my-[10px]           = margin top and bottom: 10px
      rounded             = border-radius: 4px  (close to your 5px)
      border              = border: 1px solid
      border-white/20     = border color: white at 20% opacity
      bg-white/[0.08]     = background: white at 8% opacity
      text-white          = color: white
      box-border          = box-sizing: border-box
      outline-none        = outline: none  (removes browser blue outline on focus)
      placeholder:text-white/30 = makes placeholder text white at 30% opacity

    ERROR state input → adds "border-red-500"
      border-red-500      = border-color: red

    EYE ICON → "absolute right-[15px] top-[35px] cursor-pointer text-[18px] select-none block"
      absolute            = position: absolute
      right-[15px]        = right: 15px
      top-[35px]          = top: 35px
      cursor-pointer      = cursor: pointer
      text-[18px]         = font-size: 18px
      select-none         = user-select: none

    ERROR SPAN → "text-sm px-[3px] text-[#ff6363]"
      text-sm             = font-size: 14px
      px-[3px]            = padding left + right: 3px
      text-[#ff6363]      = color: #ff6363  (your exact red color)
      hidden / block      = display:none or display:block (toggled by JS)

    ────────────────────────────────────────────────────────────────
  */

  // Reusable class strings — defined once, used in all 3 input types below
  const wrapperClass = "flex flex-col w-[280px] relative";

  const labelClass = "text-[15px] text-white/75";

  const inputBase = `
    w-full p-[15px] my-[10px] rounded
    border border-white/20
    bg-white/[0.08] text-white
    box-border outline-none
    placeholder:text-white/30
  `;

  // If submitted and field is empty → red border, else normal border
  const inputClass = `${inputBase} ${showRequiredError ? "border-red-500" : ""}`;

  // Error message span — hidden by default, shown when error exists
  const errorSpanClass = `error-msg text-sm px-[3px] text-[#ff6363] ${
    showRequiredError ? "block" : "hidden"
  }`;

  // ─── SELECT type ───────────────────────────────────────────────
  if (inputProps.type === "select") {
    return (
      <div className={wrapperClass}>
        <label className={labelClass}>{label}</label>

        <select
          name={inputProps.name}
          onChange={onChange}
          onBlur={handleFocus}
          focused={isFocused.toString()}
          value={inputProps.value}
          className={`
            w-full p-[15px] my-[10px] rounded
            border border-white/20
            bg-white/[0.08] text-white
            box-border outline-none
            [&>option]:bg-[#111]
            ${showRequiredError ? "border-red-500" : ""}
          `}
          // [&>option]:bg-[#111] means: select all <option> children → background: #111
          // This is Tailwind's way of styling child elements
        >
          <option value="">{inputProps.placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <span className={errorSpanClass}>
          {showRequiredError ? "This field is required." : errorMessage}
        </span>
      </div>
    );
  }

  // ─── PASSWORD type ─────────────────────────────────────────────
  if (inputProps.type === "password") {
    return (
      <div className={wrapperClass}>
        <label className={labelClass}>{label}</label>

        <input
          {...inputProps}
          type={showPassword ? "text" : "password"}
          onChange={onChange}
          onBlur={handleFocus}
          onFocus={() => setFocused(true)}
          focused={isFocused.toString()}
          className={`${inputClass} pr-[45px]`}
          // pr-[45px] = padding-right: 45px  (makes room for the eye icon)
        />

        {/* Eye icon — sits inside the relative wrapper, positioned absolute */}
        <span
          className="absolute right-[15px] top-[35px] cursor-pointer text-[18px] select-none block"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "🙈" : "👀"}
        </span>

        <span className={errorSpanClass}>
          {showRequiredError ? "This field is required." : errorMessage}
        </span>
      </div>
    );
  }

  // ─── DEFAULT type (text, email, date) ──────────────────────────
  return (
    <div className={wrapperClass}>
      <label className={labelClass}>{label}</label>

      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() => setFocused(true)}
        focused={isFocused.toString()}
        className={inputClass}
      />

      <span className={errorSpanClass}>
        {showRequiredError ? "This field is required." : errorMessage}
      </span>
    </div>
  );
};

export default FormInput;