export class messages {
    public static success(...args: any[]): { code?: number, message: string, data?: object } {
        let code: number | undefined;
        let message: string;
        let data: object | undefined;

        if (args.length === 1 && typeof args[0] === 'string') {
            message = args[0];
        } else if (args.length === 2 && typeof args[0] === 'number' && typeof args[1] === 'string') {
            [code, message] = args;
        } else if (args.length === 3 && typeof args[0] === 'number' && typeof args[1] === 'string' && typeof args[2] === 'object') {
            [code, message, data] = args;
        } else {
            throw new Error('Invalid parameters');
        }

        return { code, message, data };
    }
    public static error(...args: any[]): { code?: number, message: string, data?: object } {
        let code: number | undefined;
        let message: string;
        let data: object | undefined;

        if (args.length === 1 && typeof args[0] === 'string') {
            message = args[0];
        } else if (args.length === 2 && typeof args[0] === 'number' && typeof args[1] === 'string') {
            [code, message] = args;
        } else if (args.length === 3 && typeof args[0] === 'number' && typeof args[1] === 'string' && typeof args[2] === 'object') {
            [code, message, data] = args;
        } else {
            throw new Error('Invalid parameters');
        }

        return { code, message, data };
    }
}