const router = require("express").Router({})
const { HealthcheckerSimpleCheck, HealthcheckerDetailedCheck } = require("nodejs-health-checker/dist/healthchecker/healthchecker");
const { Dialects, HealthTypes } = require("nodejs-health-checker/dist/interfaces/types");

//const mongoHealthcheck = require('mongo-healthcheck')
//const  mongoose = require('mongoose');

router.get("/liveness", (_, res) => {
    res.send(HealthcheckerSimpleCheck({

    }));
});

router.get("/readiness", async (_, res) => {
    res.send(
        await HealthcheckerDetailedCheck({
            name: "Frontend",
            version: "1.0",
            integrations: [
                {
                    type: HealthTypes.Web,
                    name: "Backend server",
                    // host: "localhost:3001/api/v0/users",
                    host: "localhost:3001",
                    headers: [{ key: "Accept", value: "application/json" }],
                    customCheckerFunction: () => { return { status: true, error: {} } },
                }, {
                    type: HealthTypes.Database,
                    name: "moongodb",
                    host: "localhost",
                    dbPort: 27017,
                    dbName: "local",
                    dbUser: "root",
                    dbPwd: "root",
                    dbDialect: Dialects.mongoose,
                },],
        })
    );
});

module.exports = router;