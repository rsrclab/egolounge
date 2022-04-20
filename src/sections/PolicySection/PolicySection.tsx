import { useEffect } from "react";
import * as S from "./elements";

const termsOfUseRules = ["test1", "test2", "test1", "test2", "test1", "test2", "test1", "test2"];

const cookiesPolicyRules = ["test1", "test2", "test1", "test2", "test1", "test2", "test1", "test2"];

interface PolicySectionProps {
  policyName: "termsOfUse" | "privacyPolicy" | "cookiesPolicy";
}

export const PolicySection: React.FC<PolicySectionProps> = ({ policyName, ...props }) => {
  let isPrivacyPolicy = policyName === "privacyPolicy";
  let isCookiesPolicy = policyName === "cookiesPolicy";
  let isTermsOfUse = policyName === "termsOfUse";

  useEffect(() => {
    (function (d, s, id) {
      var js,
        tjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://app.termly.io/embed-policy.min.js";
      tjs.parentNode?.insertBefore(js, tjs);
    })(document, "script", "termly-jssdk");

    // (function(d, s, id) {
    //   var js, tjs = d.getElementsByTagName(s)[0];
    //   if (d.getElementById(id)) return;
    //   js = d.createElement(s); js.id = id;
    //   js.src = "https://app.termly.io/embed-policy.min.js";
    //   tjs.parentNode?.insertBefore(js, tjs);
    // }(document, 'script', 'termly-jssdk'));
  }, []);

  return (
    <S.PrivacyPolicyContainer {...props}>
      <S.LinksContainer>
        <S.PolicyLink href='/privacy' isActive={isPrivacyPolicy}>
          Privacy Policy
        </S.PolicyLink>
        <S.PolicyLink href='/terms' isActive={isTermsOfUse}>
          Terms of Use
        </S.PolicyLink>
        <S.PolicyLink href='/cookies-policy' isActive={isCookiesPolicy}>
          Cookies Policy
        </S.PolicyLink>
      </S.LinksContainer>
      <S.ContentContainer>
        {(isPrivacyPolicy && (
          <S.TermlyContainer
            name='termly-embed'
            data-id='85120887-4ca1-48df-9209-03bad611b811'
            data-type='iframe'
          />
        )) ||
          (isTermsOfUse && (
            <S.TermlyContainer
              name='termly-embed'
              data-id='552e4383-0034-4a5b-ace4-56a65c0320a1'
              data-type='iframe'
            />
          )) ||
          (isCookiesPolicy && (
            <S.TermlyContainer
              name='termly-embed'
              data-id='7585f66d-8ba3-44be-9002-c5d2c0fc3fe5'
              data-type='iframe'
            />
          ))}
      </S.ContentContainer>
    </S.PrivacyPolicyContainer>
  );
};
