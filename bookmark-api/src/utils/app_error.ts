// AppError 定义全局的error，方便处理，同时继承 Error
export default class AppError extends Error {
    status: string;
    fake: boolean; // 标记是否为 new AppError() 构造的， 如果是false则为 try catch 捕获的意外 error
    constructor(public statusCode: number = 500, public message: string){
        super(message) // 传递给 Error
        this.status = `${statusCode}`.startsWith("4")? 'fail' : 'error'
        this.fake = true
        // 处理堆栈信息（调用栈历史）
        Error.captureStackTrace(this, this.constructor)
    }
}

