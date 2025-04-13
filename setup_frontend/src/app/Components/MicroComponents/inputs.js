export function Input(props){
    return(
        <div >
            <input className="p-5 rounded bg-slate-100 w-auto md:w-20 " placeholder={props.placeholder}>{props.InputContent}</input>
        </div>
    );
}