// Validator 验证器，包含一个数据源和错误收集Map
export default class Validator {
    errors: Map<string, string>;
    data: any;

    constructor(data: any) {
        this.data = data
        this.errors = new Map()
    }

    // 是否通过验证
    valid() {
        return this.errors.size === 0
    }

    // 添加错误
    addError(field: string, msg: string) {
        if (!this.errors.get(field)) {
            this.errors.set(field, msg)
        }
    }

    // 获取一个错误信息
    get() {
        for(let val of this.errors.values()) {
            if (val) {
                return val
            }
        }
    }

    // 是否必填
    required(...fields: string[]){
        for(let field of fields) {
            let val = this.data[field]
            if(!val && val !== 0 && val !== false){
                this.addError(field, `${field} 字段必填`)
            }
        }
    }

    // 检查最小长度
    minLength(field: string, min: number, msg?: string){
        let x = this.data[field] || ""
        if (x.length < min) {
            msg = msg? msg : `${field}长度必须大于${min}`
            this.addError(field, msg)
        }
    }

    // 检查最大长度
    maxLength(field: string, max: number, msg?: string){
        let x = this.data[field] || ""
        if (x.length > max) {
            msg = msg? msg : `${field}长度必须小于${max}`
            this.addError(field, msg)
        }
    }

    // 检查 expr 表达式不是 true 时，添加错误
    check(expr: boolean, field: string, msg: string) {
        if (!expr) {
            this.addError(field, msg)
        }
    }

    // 是否包含某个字段
    has(field: string){
        let x = this.data[field]
        if (x) {
            return true
        }
        return false
    }

    // 检查是否是手机号码
    isPhone(val: string){
        const re = /^1[3-9]\d{9}$/;
        return re.test(val)
    }
}

