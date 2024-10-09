import config from '../../core/config';
import { HandlerContext, RouteEndpointHandler } from '..';
import { verifyJwtToken } from '../../middlewares/utils';
import jwt, { Algorithm, VerifyOptions } from 'jsonwebtoken';

const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYTJhYTVmYzA3Yjg5YTQzNTc0ZDY1YTZiNWRhZmM4N2JjZDI4ZjA2Y2Q3ZDllMjU4ZWM3ZTBmZWMwOGE5MTcxYWQzYzM5ZGY0NGRjOTc4N2EiLCJpYXQiOjE3MjczMzU0MjIuNzQyNzc1LCJuYmYiOjE3MjczMzU0MjIuNzQyNzgxLCJleHAiOjE3Mjc3Njc0MjIuNjUwMTksInN1YiI6IjEiLCJzY29wZXMiOltdfQ.d-q5lfVNKzW5RWnpy1wmTswbZjZLos1iX04JASCIyoTn80Z6DnWTv4A-oxdMuGSMgBWugBfksBDhQbH2juLeOATaKuuGjpxnmW5St5J6P3lYUhhMEDwdgEd65Nl5Oluo3pQgV4BC-ZVkXLBZcQbPDVXbVaQXLtfkitXWgEReA3Zk_bWN584VUSv0UaccTO0IBQd0FMQt_azL4xG1-30jhoSMoFFouFHgW4Rey1H7r0Az3Q-8-hROOprrwv5igxTu7mxQapfuQeMg6VMcDf7vCzhoAhkAZ1cmQCeqIHcJhznOoLJ_JYsFn3DgOselUUe3jnh9ZAush938-OKzc0u1Wf57SVF-NadFnAzxryKy_BgkYsqW6FVvB-lh3tsDJvHa6ZZVwhYWVu-hnQm2musTA6phHffwjv8F0o--GVt_WaGaU4QLcei3jpGyAf-Ps7m0uEyq2LZqgUWt7rnmO4B1MmRbdQzLDexklrPeY4TGgzVfhL39OZOQzHxvWAmdVUbCo1_kE4R7Np_RY8HsOA-Hx7v1f_C_jdSHrqCCMrUcWhL39UNvfa2OYHE1qjMmVfG5CqNd-E-9YviRW3WjgxnB1JuUy2V023-nufKmxp_54EnEf6sBDsi9UxU1hIzTSs-0TlCaGDh_ghWQYOOZZcuw1p8kYT6np7jWPh0jpfBK3Y4';

export const getPhoneNumberById: RouteEndpointHandler = (context: HandlerContext) => async (req, res, next) => {
    console.log(config.jwt);
    console.log(req.context);
    // const payload = await verifyJwtToken(token, config.jwt.integrated.secret);
    // jwt.verify(token, config.jwt.integrated.secret, { algorithms: ['HS256'] }, (err, payload) => {
    //     console.log(err);
    //     console.log(payload);
    // });

    // const rawData = await jwt.verify(token, config.jwt.integrated.secret, { algorithms: ['RS256'] });

    // console.log(rawData);
    res.status(200).json({ message: 'Success' });
};
