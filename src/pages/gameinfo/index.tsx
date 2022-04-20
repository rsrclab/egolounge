const lib = require("lib")({
  token:
    "tok_dev_dwB5MwMN7v2vg4GKfM2LzkyhUowExuDu8GpbEP5jfFHuRgRzBc1LBsvP64zeuJ5M" /* link an account to create an auth token */
});

const GameInfo = ({ haloData }) => {
  console.log(haloData);
  return <main>hi</main>;
};

export const getServerSideProps = async () => {
  // all time stats
  let result = await lib.halo.infinite["@0.3.8"].stats["service-record"].multiplayer({
    gamertag: "threesided", // required
    filter: "matchmade:pvp"
  });

  // match history
  let resultA = await lib.halo.infinite["@0.3.8"].stats.matches.list({
    gamertag: "threesided", // required
    limit: {
      count: 1,
      offset: 0
    },
    mode: "matchmade"
  });

  const haloResultData = { test: result, matchTest: resultA };

  return {
    props: {
      haloData: haloResultData
    }
  };
};

export default GameInfo;
