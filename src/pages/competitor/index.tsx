import { NextPage } from "next";
import {
  Hero,
  UserSectionsWrapper,
  UserAvatarSection,
  UserDetailsSection,
  UserSocialsSection,
  UserGamesSection
} from "~/sections";
import { PageWithAuthentication } from "~/components";

const AccountSettings: NextPage = () => {
  return (
    <main>
      <Hero heroImgPath='/static/img/banners/bannerEgoFile.png' />
      <UserSectionsWrapper>
        <UserAvatarSection />
        <UserDetailsSection />
        {/* <UserSocialsSection /> */}
        <UserGamesSection />
      </UserSectionsWrapper>
    </main>
  );
};

export default PageWithAuthentication(AccountSettings);

// export const getServerSideProps: GetServerSideProps = async context => {
//   //
//   return { props: {} };
// };
