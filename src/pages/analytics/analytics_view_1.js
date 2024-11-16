import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { GraphContainer } from "../../components/containers";
import { CompareControlBoard, GraphTypeControl, TimelineControlBoard } from "../../data_display/controls";
import { Chart, MetricsContainer } from "../../data_display/graphs";
import { DisplayTable } from "../../data_display/tables";

export default function AnalyticsView1({baseURL, columns, setPath, title, unique_value, GT1 = 'bar', GT2 = 'bar'}){
    const [data1, setData1] = useState({})
    const [data2, setData2] = useState({})

    const [loaded1, setLoaded1] = useState(false)
    const [loaded2, setLoaded2] = useState(false)

    const [T1, setT1] = useState()
    const [T2, setT2] = useState()

    const [type1, setType1] = useState(0)
    const [type2, setType2] = useState(0)

    const [param2, setParam2] = useState()

    useEffect(() =>{
        setLoaded1(true)
    },[data1])

    useEffect(() =>{
        setLoaded2(true)
    },[data2])

    
   
    return <div className="w-[100%] flex flex-col items-center">
        <MetricsContainer metrics={data1.dashboard_data ?? []} />
        
            {(loaded1) ? <GraphContainer title = {title} subtitle={T1 + title.toUpperCase()}
                graphTypeController={<GraphTypeControl choices = {['bar', 'line', 'pie', 'radar', 'heatmap']} type = {type1} setType = {setType1} />}
                graph = {<Chart data = {data1} graph_data = {data1.table} y = {data1.y ?? []} type = {type1} keys = {data1.keys} />}
                paramBoard={<CompareControlBoard setTitle = {setT1} setData={setData1} baseURL={baseURL} />}
                table = {<DisplayTable columns = {columns} rows={data1.table} id_function = {(row) => row[unique_value]}  />}
            /> : <Skeleton sx={{width : '95%', borderRadius : '0.5rem', height : '70vh', marginTop : '2rem'}} variant="rectangular">
              </Skeleton>}
        
              {(loaded2) ? <GraphContainer title = {`${title} Timeline`} subtitle={T2 + title.toUpperCase()}
                graphTypeController={<GraphTypeControl choices = {['bar', 'line', 'pie', 'radar', 'heatmap', 'calendar']} type = {type2} setType = {setType2} />}
                graph = {<Chart param = {param2} data = {data2} graph_data = {data2.table} y = {data2.y ?? []} type = {type2} keys = {data2.keys} />}
                paramBoard={<TimelineControlBoard type = {type2} param ={param2} setParam={setParam2} setPath = {setPath} setTitle = {setT2} setData={setData2} baseURL={baseURL} data = {data2} />}
                table = {<DisplayTable columns = {columns} rows={data2.table} id_function = {(row) => row[unique_value]}  />}
            />: <Skeleton sx={{width : '95%', borderRadius : '0.5rem', height : '70vh', marginTop : '2rem'}} variant="rectangular">
              </Skeleton>}
            
    </div>
}