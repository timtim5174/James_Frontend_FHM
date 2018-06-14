export interface BarGraph {

    type: string;
    data: {
        labels: string[];
        datasets: [
            {
                label: string;
                backgroundColor: string[];
                data: number[];
            }
        ]
    };
    options: {
        legend: {
            display: boolean;
        },
        title: {
            display: boolean;
        }
    };
}
