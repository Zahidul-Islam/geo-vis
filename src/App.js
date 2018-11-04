import React, { Component } from "react";
import { connect } from "react-redux";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import KeplerGl from "kepler.gl";

import { addDataToMap } from "kepler.gl/actions";
import Processors from "kepler.gl/processors";
import KeplerGlSchema from "kepler.gl/schemas";
import downloadJsonFile from "./file-download";

// Sample data
import nycTrips from "./data/nyc-trips.csv";
import nycTripsSubset from "./data/nyc-subset.csv";
import nycConfig from "./data/nyc-config";

// Sample data earthquakes
// import virginiaInsurancePointsSample from "./data/virginia-insurance-points-sample.csv";
// import southCarolinaInsurancePointsSample from "./data/south-carolina-insurance-points-sample.csv";
// import earthquakesSouthCarolinaRegion from "./data/earthquakes-SouthCarolinaRegion.csv";
// import regionXagSouthCarolina from "./data/region-xag-south-carolina.csv";
// import regionXabVirginia from "./data/region-xab-virginia.csv";

const MAPBOX_TOKEN =
  process.env.MapboxAccessToken || process.env.REACT_APP_MAPBOX_TOKEN; // eslint-disable-line

class App extends Component {
  componentDidMount() {
    // [
    //   virginiaInsurancePointsSample,
    //   southCarolinaInsurancePointsSample,
    //   earthquakesSouthCarolinaRegion,
    //   regionXagSouthCarolina
    //   //regionXabVirginia
    // ].forEach((dataSet, idx) => {
    //   if (dataSet) {
    //     const data = Processors.processCsvData(dataSet);
    //     console.log("===>", data);
    //     this.props.dispatch(
    //       addDataToMap({
    //         datasets: {
    //           data,
    //           info: {
    //             id: `dataSet${idx}`
    //           }
    //         }
    //       })
    //     );
    //   }
    // });
    // Use processCsvData helper to convert csv file into kepler.gl structure {fields, rows}
    const data = Processors.processCsvData(nycTrips);
    // Create dataset structure
    const dataset = {
      data,
      info: {
        // this is used to match the dataId defined in nyc-config.json. For more details see API documentation.
        // It is paramount that this id matches your configuration otherwise the configuration file will be ignored.
        id: "my_data"
      }
    };
    // addDataToMap action to inject dataset into kepler.gl instance
    this.props.dispatch(addDataToMap({ datasets: dataset, config: nycConfig }));
  }

  // This method is used as reference to show how to export the current kepler.gl instance configuration
  // Once exported the configuration can be imported using parseSavedConfig or load method from KeplerGlSchema
  getMapConfig() {
    // retrieve kepler.gl store
    const { keplerGl } = this.props;
    // retrieve current kepler.gl instance store
    const { map } = keplerGl;

    // create the config object
    return KeplerGlSchema.getConfigToSave(map);
  }

  // This method is used as reference to show how to export the current kepler.gl instance configuration
  // Once exported the configuration can be imported using parseSavedConfig or load method from KeplerGlSchema
  exportMapConfig = () => {
    // create the config object
    const mapConfig = this.getMapConfig();
    // save it as a json file
    downloadJsonFile(mapConfig, "kepler.gl.json");
  };

  // Created to show how to replace dataset with new data and keeping the same configuration
  replaceData = () => {
    // Use processCsvData helper to convert csv file into kepler.gl structure {fields, rows}
    const data = Processors.processCsvData(nycTripsSubset);
    // Create dataset structure
    const dataset = {
      data,
      info: {
        id: "dataSet1"
        // this is used to match the dataId defined in nyc-config.json. For more details see API documentation.
        // It is paramount that this id mathces your configuration otherwise the configuration file will be ignored.
      }
    };

    // read the current configuration
    const config = this.getMapConfig();

    // addDataToMap action to inject dataset into kepler.gl instance
    this.props.dispatch(addDataToMap({ datasets: dataset, config }));
  };

  render() {
    return (
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          minHeight: "50vh"
        }}
      >
        <AutoSizer>
          {({ height, width }) => (
            <KeplerGl
              mapboxApiAccessToken={MAPBOX_TOKEN}
              id="map"
              width={width}
              height={height}
              appName="Cystellar"
              version="v1.0-beta"
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
