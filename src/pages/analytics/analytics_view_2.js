import { Skeleton } from "@mui/material";
import { useState } from "react";
import { GraphContainer } from "../../components/containers";
import { GraphTypeControl, ParametersBoard } from "../../data_display/controls";
import { Chart, MetricsContainer } from "../../data_display/graphs";
import { DisplayTable } from "../../data_display/tables";

export default function AnalyticsView2({data, columns, x, y, unit, keys, setY, title, unique_value}){
    const [type, setType] = useState(0)   

    return <div className="w-[100%] flex flex-col items-center">
            <MetricsContainer metrics={data.dashboard_data ?? []} />
            {Object.keys(data).length ? <GraphContainer title = {title} subtitle={data.dashboard_data ? 'On '+data.dashboard_data[0].change : ''}
                graphTypeController={<GraphTypeControl choices = {['bar', 'line', 'pie', 'heatmap']} type = {type} setType = {setType} />}
                graph = {<Chart data = {data} graph_data = {data.table} y = {y} type = {type} keys = {['quantity', 'unit_price']} />}
                paramBoard={<ParametersBoard keys = {keys} y= {y[0]} setY = {setY} />}
                table = {<DisplayTable columns = {columns} rows = {data.table} id_function = {(row) => row[unique_value]}  />
            }
            /> : <Skeleton sx={{width : '95%', borderRadius : '0.5rem', height : '70vh', marginTop : '2rem'}} variant="rectangular">
              </Skeleton>}     
            
        </div>   
}