declare type IPrimitive = string | number | boolean | null | undefined;

declare module 'babel-plugin-tester' {
  type ErrorHandler = (error: Error) => boolean;

  interface IOptions {
    plugin: any;
    fixtures?: string;
    title?: string;
    tests?: {
      [index: string]: Partial<{
        title: string;
        code: string;
        output: string;
        fixture: string;
        snapshot: boolean;
        only: boolean;
        error: boolean | string | RegExp | typeof Error | ErrorHandler;
        setup: () => void | (() => void) | Promise<any>;
        teardown: () => void;

        //added properties
        result: any; //expected result for exec tests
      }>
    }
  }

  export default function pluginTester(options: IOptions): void;
}