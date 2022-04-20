import type { NextPage } from "next";
import { Hero, RegisterSection } from "~/sections";

const Register: NextPage = () => {
  return (
    <main>
      <Hero heroImgPath='/static/img/banners/bannerRegister.png' />
      <RegisterSection />
    </main>
  );
};

export default Register;
