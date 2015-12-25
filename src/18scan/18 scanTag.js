function scanTag(elem, vmodel, siblings) {
    var props = elem.props
    //更新数据
    var v = props["data-important"]
    var vm = avalon.vmodels[v]
    if (vm) {
        vmodel = vm
        vtree[v] = elem
    } else {
        v = props["data-controller"]
        vm = avalon.vmodels[v]
        if (vm) {
            vtree[v] = elem
            if (vmodel) {
                vm = avalon.createProxy(vmodel, vm)
            }
            vmodel = vm
        }
    }
    if (v && !vm) {
        return avalon.log("[" + v + "] vmodel has not defined yet!")
    }

    if (elem.type.indexOf(":") > 0 && !avalon.components[elem.type]) {
        //avalon.component(elem)
    } else {
        scanAttrs(elem, vmodel, siblings)
    }
    return elem
}

// 