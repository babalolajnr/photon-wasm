import RunTimeLogger from "./RunTimeLogger";
import Toastr from 'toastr'


export default class ToastrRunTimeLogger implements RunTimeLogger {

    show(message: string): void {
        Toastr.info(message, undefined, {
            "timeOut": -1
        })
    }
}