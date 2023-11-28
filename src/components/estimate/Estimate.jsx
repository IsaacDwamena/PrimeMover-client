import "./Estimate.scss";
import axios from "axios";

export const Estimate = () => {
  //   async function calculateDistances() {
  //     const origin1 = "927 Ellesmere Avenue";

  //     const destinationA = "167 Ronald hooper Avenue";

  //     const apiKey = "AIzaSyAoevEryLyyQYauodk_zVurogozkWfIz14";

  //     try {
  //       const response = await axios.get(
  //         "https://maps.googleapis.com/maps/api/distancematrix/json",
  //         {
  //           params: {
  //             origins: [origin1],
  //             destinations: [destinationA],
  //             travelMode: "DRIVING",
  //             unitSystem: "metric",
  //             avoidHighways: false,
  //             avoidTolls: false,
  //             key: apiKey,
  //           },
  //         }
  //       );

  //       return response.data;
  //     } catch (error) {
  //       throw new Error(`Distance matrix request failed: ${error.message}`);
  //     }
  //   }

  //   async function main() {
  //     try {
  //       const response = await calculateDistances();
  //       console.log(response);
  //       // Handle the distance matrix response here
  //     } catch (error) {
  //       console.error(error.message);
  //       // Handle error
  //     }
  //   }

  //   main();

  return (
    <div className="estimate">
      <form className="estimate__form"></form>
    </div>
  );
};
