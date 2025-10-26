import { Header } from './heading';
import { Alayticswrap } from './analyticswrap';
const Analytics=()=>{
    const aStyle={maxHeight:"550px",overflowY:"scroll"}
    return(
        <div style={aStyle}>
             <Header title="Analytics" subtitle="Your complaint submission insights"/>
             <Alayticswrap/>
        </div>
    )
}
export default Analytics;