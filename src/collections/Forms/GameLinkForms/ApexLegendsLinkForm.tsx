import * as S from "./elements";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useYupValidationResolver } from "~/utils";
import axios from "axios";
import { auth, axiosInstance } from "../../../lib";
import { FormEvent, useContext } from "react";
import { UserContext } from "../../../context";
import { useRouter } from "next/router";

const registerSchema = yup.object({
  username: yup.string().required("You have to fill this field.")
});

export const ApexLegendsLinkForm: React.FC = ({ ...props }) => {
  // const resolver = useYupValidationResolver(registerSchema);
  // const { user } = useContext(UserContext);
  // const router = useRouter();
  // const form = useForm({ resolver });

  // const onSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   if (user.gameAccounts.apex) return;
  //   if (!localStorage.getItem(user_access_token_item_name)) return;
  //   const username = (form.getValues() as any).username;
  //   try {
  //     const res = await axiosInstance.post("/api/auth/origin/login", {
  //       username,
  //       userIdToken: localStorage.getItem(user_access_token_item_name)
  //     });
  //     if (res.data.err) {
  //       return alert(res.data.err);
  //     }
  //     router.reload();
  //   } catch (e) {
  //     alert(e);
  //   }
  //   // console.log(linkTheApex.data);
  // };

  return (
    <></>
    // <S.Form {...props} onSubmit={onSubmit}>
    //   <S.Input
    //     id='username'
    //     placeholder='Origin username here...'
    //     labelText='Origin Username'
    //     form={form}
    //   />

    //   <S.Button value='Submit' type='submit' />
    // </S.Form>
  );
};
