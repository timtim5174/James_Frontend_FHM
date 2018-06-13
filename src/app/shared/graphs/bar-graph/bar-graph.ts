export interface BarGraph {

    type: string;
    axisLables: string[];
    dataset: [{
        label: string,
        data: number[],
        fill: boolean,
        backgroundColor: string,
        borderColor: string
    }];
    x: {
        name: string;
        show: boolean;
    };
    y: {
        name: string;
        show: boolean;
    };
    chartname: string;
    elements: {
        tension: number;
        radius: number;
    };

}
