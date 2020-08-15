import React from 'react';
import {VictoryPie} from "victory-native";

const PieChart = (props) =>{
    return(
        <VictoryPie
            colorScale={["#EAB781", "#DCA392"]}
            data={props.times}
            radius={({ datum }) => 150 + datum.focus * 10}
            labels={[]}
            events={[{
            target: "data",
            eventHandlers: {
                onPressIn: () => {
                return [
                    {
                    target: "data",
                    mutation: (thisProps) => {
                        props.setFocusWork(thisProps.index);
                    },
                    }
                ];
                }
            }
            }]}
            innerRadius= {100}
            standalone={false}
        />
);
}

export default PieChart;