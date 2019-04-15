import React from 'react';
import { View, Text, Image } from 'react-native';
import { BarChart, Grid, XAxis, PieChart } from 'react-native-svg-charts';
import { Text as SvgText } from 'react-native-svg';
import * as shape from 'd3-shape';
import BarChart2 from '../commen/BarChart';

// const CUT_OFF = 2;
// const BarLabels = ({ x, y, bandwidth, data }) =>
//   data.map((value, index) => (
//     <SvgText
//       key={index}
//       x={x(index) + bandwidth / 2}
//       y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
//       fontSize={14}
//       fill={value >= CUT_OFF ? 'white' : 'black'}
//       alignmentBaseline={'middle'}
//       textAnchor={'middle'}
//     >
//       {value}
//     </SvgText>
//   ));
const PieLabels = ({ slices, height, width }) => {
  return slices.map((slice, index) => {
    const { labelCentroid, pieCentroid, data } = slice;
    return (
      <SvgText
        key={index}
        x={pieCentroid[0]}
        y={pieCentroid[1]}
        fill={'black'}
        textAnchor={'middle'}
        alignmentBaseline={'middle'}
        fontSize={15}
        stroke={'black'}
        strokeWidth={0.2}
      >
        {data.amount}
      </SvgText>
    );
  });
};
const BarChartUi = ({ Xdata, data, titleText }) => (
  // <View style={styles.cardContainer}>
  //   <View style={{ flexDirection: 'row', paddingLeft: 10, paddingRight: 10 }}>
  //     <Text style={styles.titleStyle}>{titleText}</Text>
  //   </View>
  //   <BarChart
  //     style={{
  //       height: 300,
  //       paddingLeft: 30,
  //       paddingRight: 25
  //     }}
  //     data={data}
  //     svg={{ fill: fill[currentItem] }}
  //     contentInset={{ top: 30, bottom: 30 }}
  //     curve={shape.curveNatural}
  //     animate
  //     animationDuration={3000}
  //   >
  //     <Grid />
  //     <BarLabels />
  //   </BarChart>
  //   <XAxis
  //     data={data}
  //     formatLabel={index => Xdata[index]}
  //     contentInset={{ left: 20, right: 20 }}
  //     svg={{ fontSize: 10, fill: 'grey' }}
  //     spacingInner={0.8}
  //     style={{
  //       height: 10,
  //       left: 13,
  //       top: 5,
  //       marginTop: 10,
  //       width: '90%',
  //       paddingLeft: 30,
  //       paddingRight: 30
  //     }}
  //   />
  // </View>

  <BarChart2
    height={350}
    width={'100%'}
    chart={{
      values: [[data[0]], [data[1]], [data[2]], [data[3]], [data[4]]],
      colors: {
        labelsColor: ['#4286F5', '#DC4437', '#F5B400', '#DC4437', '#F5B400'],
        axisColor: 'rgba(216, 216, 216, 1)'
      },
      labels: Xdata,
      selected: 4,
      axis: [titleText]
    }}
  />
);

const PieChartUi = ({ Xdata, data, titleText }) => (
  <View style={styles.cardContainer}>
    <View style={{ flexDirection: 'row', paddingLeft: 10, paddingRight: 10 }}>
      <Text style={styles.titleStyle}>{titleText}</Text>
    </View>
    <PieChart
      style={{ height: 200, padding: 5 }}
      valueAccessor={({ item }) => item.amount}
      data={data}
      spacing={0}
      outerRadius={'95%'}
    >
      <PieLabels />
    </PieChart>
  </View>
);

const styles = {
  cardContainer: {
    width: '90%',
    backgroundColor: 'white',
    padding: 15,
    margin: 10,
    alignContent: 'center',
    alignSelf: 'center',
    shadowColor: 'black',
    shadowOffset: 0.5,
    shadowOpacity: 1,
    borderRadius: 0.5,
    borderColor: 'white'
  },
  titleStyle: {
    color: 'rgb(47, 54, 64)',
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 15
  }
};

export { BarChartUi, PieChartUi };
