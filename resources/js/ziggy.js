const Ziggy = {"url":"http:\/\/users.local","port":null,"defaults":{},"routes":{"sanctum.csrf-cookie":{"uri":"sanctum\/csrf-cookie","methods":["GET","HEAD"]},"ignition.healthCheck":{"uri":"_ignition\/health-check","methods":["GET","HEAD"]},"ignition.executeSolution":{"uri":"_ignition\/execute-solution","methods":["POST"]},"ignition.updateConfig":{"uri":"_ignition\/update-config","methods":["POST"]},"landing":{"uri":"\/","methods":["GET","HEAD"]},"login.index":{"uri":"login","methods":["GET","HEAD"]},"login":{"uri":"login","methods":["POST"]},"register.index":{"uri":"register","methods":["GET","HEAD"]},"register":{"uri":"register","methods":["POST"]},"logout":{"uri":"logout","methods":["GET","HEAD"]},"dashboard.index":{"uri":"dashboard","methods":["GET","HEAD"]},"dashboard.users.list.page":{"uri":"dashboard\/users\/list","methods":["GET","HEAD"]},"dashboard.users.list.data":{"uri":"dashboard\/users\/list\/data","methods":["GET","HEAD"]}}};

if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}

export { Ziggy };