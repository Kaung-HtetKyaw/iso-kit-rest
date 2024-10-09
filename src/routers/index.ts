import { Express, Router, Response, NextFunction } from 'express';
import { Query, ParamsDictionary, Request as CoreRequest } from 'express-serve-static-core';
import { OperationsContext } from '../database/instance';
import { Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export type SocketServerInstance = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

export type HandlerContext = { operations: OperationsContext };

export type RouterHander = (context: HandlerContext) => Router;

export interface RouteRequest<
    P = ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = Query,
    Locals extends Record<string, any> = Record<string, any>
> extends CoreRequest<P, ResBody, ReqBody, ReqQuery, Locals> {}

export type RouteEndpointHandler<
    P = ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = Query,
    Locals extends Record<string, any> = Record<string, any>
> = (
    context: HandlerContext
) => (req: RouteRequest<P, ResBody, ReqBody, ReqQuery, Locals>, res: Response, next: NextFunction) => Promise<void>;

export type MiddlewareHandler<
    P = ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = Query,
    Locals extends Record<string, any> = { test: string }
> = (
    context: HandlerContext
) => (
    req: RouteRequest<P, ResBody, ReqBody, ReqQuery, Locals>,
    res: Response,
    next: NextFunction
) => Promise<void> | void;

const connectRouters = ({ expressServer, operations }: { expressServer: Express; operations: OperationsContext }) => {
    // add route handlers here
};

export default connectRouters;
