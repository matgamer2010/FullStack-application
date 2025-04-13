export function Button(props){
    return(
        <div>
            <button className={props.Class}>{props.ButtonContent}</button>
        </div>
    );
}