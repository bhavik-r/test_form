import { useState } from "react";
// ✅ No App.css import — all styles are Tailwind classes below
import FormInput from "./components/FormInput";

/*
  ─── APP.JSX TAILWIND CLASS EXPLANATIONS ────────────────────────

  OUTER DIV (was .app) →
    "flex items-center justify-start pl-[15%] h-screen relative bg-cover bg-center"
      flex            = display: flex
      items-center    = align-items: center  (vertical center)
      justify-start   = justify-content: flex-start  (left side)
      pl-[15%]        = padding-left: 15%
      h-screen        = height: 100vh
      relative        = position: relative  (so overlay div can sit on top)
      bg-cover        = background-size: cover
      bg-center       = background-position: center

  NOTE: The background image + dark overlay are split into 2 layers:
    Layer 1 → bg-[url(...)]  sets the image
    Layer 2 → a separate <div> with bg-black/60 creates the dark overlay
    This is cleaner than trying to do a CSS linear-gradient hack in Tailwind

  FORM →
    "relative z-10 bg-black/50 px-[60px] rounded-[10px] backdrop-blur-[8px] border border-white/[0.34]"
      relative            = position: relative
      z-10                = z-index: 10  (sits above the dark overlay div)
      bg-black/50         = background: black at 50% opacity
      px-[60px]           = padding left + right: 60px
      rounded-[10px]      = border-radius: 10px
      backdrop-blur-[8px] = backdrop-filter: blur(8px)
      border              = border: 1px solid
      border-white/[0.34] = border color: white at 34% opacity

  H1 →
    "text-white text-center pt-[25px] pb-[25px] text-3xl tracking-[5px]"
      text-white      = color: white
      text-center     = text-align: center
      pt-[25px]       = padding-top: 25px
      pb-[25px]       = padding-bottom: 25px
      text-3xl        = font-size: 30px
      tracking-[5px]  = letter-spacing: 5px
    + style={{ fontFamily: "'Creepster', cursive" }}
      Tailwind can't load Google Fonts by class — we keep font-family inline

  BUTTON →
    "w-[60%] h-[50px] px-[10px] border-none bg-[rgb(1,158,8)] text-white rounded-full font-bold text-lg cursor-pointer mx-auto mt-[35px] mb-[30px] block"
      w-[60%]             = width: 60%
      h-[50px]            = height: 50px
      px-[10px]           = padding left+right: 10px
      border-none         = border: none
      bg-[rgb(1,158,8)]   = background: your exact green color
      text-white          = color: white
      rounded-full        = border-radius: 9999px  (pill shape)
      font-bold           = font-weight: bold
      text-lg             = font-size: 18px
      cursor-pointer      = cursor: pointer
      mx-auto             = margin left+right: auto  (centers it)
      mt-[35px]           = margin-top: 35px
      mb-[30px]           = margin-bottom: 30px
      block               = display: block  (needed for mx-auto to work)

  ─────────────────────────────────────────────────────────────────
*/

const App = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "write your Username",
      errorMessage: "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      pattern: "[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}",
      required: true,
    },
    {
      id: 3,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      label: "Birthday",
      max: new Date().toISOString().split("T")[0],
      required: true,
    },
    {
      id: 4,
      name: "country",
      type: "select",
      placeholder: "Select your country",
      label: "Country",
      options: [
        "United States", "United Kingdom", "Canada", "Australia",
        "Germany", "France", "India", "Japan", "Brazil", "Other",
      ],
    },
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 6,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (e.target.checkValidity()) {
      console.log("Form Data:", values);
      alert("form submitted successfully");
      setValues({
        username: "",
        email: "",
        birthday: "",
        country: "",
        password: "",
        confirmPassword: "",
      });
      setSubmitted(false);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    // OUTER wrapper — full screen with background image
    <div
      className="flex items-center justify-start pl-[15%] h-screen relative bg-cover bg-center"
      style={{
        backgroundImage: `url("https://images.pexels.com/photos/619419/pexels-photo-619419.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1920")`
        // backgroundImage stays inline because Tailwind can't take dynamic URLs safely in all setups
      }}
    >
      {/* Dark overlay — sits on top of image, behind the form */}
      <div className="absolute inset-0 bg-black/60" />
      {/* 
        absolute   = position: absolute
        inset-0    = top:0 right:0 bottom:0 left:0  (covers entire parent)
        bg-black/60 = background: black at 60% opacity
      */}

      {/* FORM — z-10 so it sits above the overlay */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="relative z-10 bg-black/50 px-[60px] rounded-[10px] backdrop-blur-[8px] border border-white/[0.34]"
      >
        <h1
          className="text-white text-center pt-[25px] pb-[25px] text-3xl tracking-[5px]"
          style={{ fontFamily: "'Creepster', cursive" }}
        >
          Register
        </h1>

        <FormInput {...inputs[0]} value={values.username}        onChange={onChange} submitted={submitted} />
        <FormInput {...inputs[1]} value={values.email}           onChange={onChange} submitted={submitted} />
        <FormInput {...inputs[2]} value={values.birthday}        onChange={onChange} submitted={submitted} />
        <FormInput {...inputs[3]} value={values.country}         onChange={onChange} submitted={submitted} />
        <FormInput {...inputs[4]} value={values.password}        onChange={onChange} submitted={submitted} />
        <FormInput {...inputs[5]} value={values.confirmPassword} onChange={onChange} submitted={submitted} />

        <button
          className="w-[60%] h-[50px] px-[10px] border-none bg-[rgb(1,158,8)] text-white rounded-full font-bold text-lg cursor-pointer mx-auto mt-[35px] mb-[30px] block hover:bg-green-700"
          // hover:bg-green-700 = on hover, slightly darker green — bonus Tailwind state!
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;