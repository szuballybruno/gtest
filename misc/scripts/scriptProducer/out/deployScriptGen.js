(()=>{"use strict";var t={993:function(t,n,e){var r=this&&this.__assign||function(){return r=Object.assign||function(t){for(var n,e=1,r=arguments.length;e<r;e++)for(var o in n=arguments[e])Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o]);return t},r.apply(this,arguments)};Object.defineProperty(n,"__esModule",{value:!0}),n.SoftSchemaScriptService=void 0;var o=e(360),i=e(757),a=function(){function t(t){this._sqlFolderPath=t,this._sqlFolderNames=["views","constraints","functions","indices","triggers"]}return t.prototype.getSoftSchemaScript=function(){var t=this;return this._readAllSQLFolders().map((function(n){return r(r({},n),{script:"views"===n.sqlFolderName?t._getViewCreationScript(n.files):n.files.map((function(t){return"-- ".concat(t.name," \n").concat(t.content).concat(t.content.endsWith(";")?"":";")})).join("\n")})})).map((function(n){return t._mainScectionWrapper(n.sqlFolderName,n.script)})).join("\n")},t.prototype._mainScectionWrapper=function(t,n){return"\n-- CREATE ".concat(t,"\n").concat(n,"\n")},t.prototype._readSQLFolderFiles=function(t){var n="".concat(this._sqlFolderPath,"/").concat(t);return Array.from((0,o.getAllFilePaths)(n)).map((function(t){return"".concat(n,"/").concat(t)}))},t.prototype._readAllSQLFolders=function(){var t=this;return this._sqlFolderNames.map((function(n){return{sqlFolderName:n,files:t._readSQLFolderFiles(n).filter((function(t){return t.endsWith(".sql")})).map((function(t){return{name:o.Polyfills.getFileName(t).replace(".sql",""),path:t,content:(0,o.readFileSync)(t)}}))}}))},t.prototype._getViewCreationScript=function(t){var n=this._getDepsOfViews(t);return i.XDependency.orderDepHierarchy(n).map((function(n){return t.single((function(t){return t.name===n.getCompareKey()}))})).map((function(t){return"\n--".concat(t.name,"\nCREATE VIEW ").concat(t.name,"\nAS\n").concat(t.content,";")})).join("\n")},t.prototype._getDepsOfViews=function(t){var n=this;return t.map((function(t){return new i.DepHierarchyItem({key:t.name,deps:n._getDepsOfView(t.content)})}))},t.prototype._getDepsOfView=function(t){return(0,o.regexMatchAll)(t,new RegExp("public\\..*_view","g")).map((function(t){return t.replace("public.","")})).groupBy((function(t){return t})).map((function(t){return t.key}))},t}();n.SoftSchemaScriptService=a},757:function(t,n){var e=this&&this.__spreadArray||function(t,n,e){if(e||2===arguments.length)for(var r,o=0,i=n.length;o<i;o++)!r&&o in n||(r||(r=Array.prototype.slice.call(n,0,o)),r[o]=n[o]);return t.concat(r||Array.prototype.slice.call(n))};Object.defineProperty(n,"__esModule",{value:!0}),n.XDependency=n.DepHierarchyItem=void 0;var r=function(){function t(t){var n;this.key=t.key,this.deps=null!==(n=t.deps)&&void 0!==n?n:[],this.params=t.params,this.instance=t.instance}return t.prototype.getCompareKey=function(){return this._getCompareKeyFromValue(this.key)},t.prototype.getDepsCompareKeys=function(){var t=this;return this.deps.map((function(n){return t._getCompareKeyFromValue(n)}))},t.prototype._getCompareKeyFromValue=function(t){return"string"==typeof t?t:t.name},t}();n.DepHierarchyItem=r;var o=function(){function t(){this._items=[]}return t.prototype.addFunction=function(t,n,e){var o=new r({key:t,deps:n,params:e});return this._items.push(o),this},t.prototype.addClass=function(t,n){var e=new r({key:t,deps:n});return this._items.push(e),this},t.prototype.addClassInstance=function(t,n){var e=new r({key:t,instance:n});return this._items.push(e),this},t.prototype.getContainer=function(){return this._items},t}(),i=function(){function t(){}return t.getFunctionBuilder=function(){return new o},t.getClassBuilder=function(){return new o},t.instantiate=function(t){var n=this.orderDepHierarchy(t);return this.instatiateOnly(n)},t.instatiateOnly=function(t){var n={},r=function(t){var e;return null!==(e=n[t])&&void 0!==e?e:null},o=function(i){var a=i.getDepsCompareKeys().map((function(n){return r(n)?r(n):o(t.single((function(t){return t.getCompareKey()===n})))})),c=function(t,n){var r;if(t.instance)return t.instance;var o=t.key;return Object.getOwnPropertyNames(o).includes("prototype")?new((r=o).bind.apply(r,e([void 0],n,!1))):o.apply(void 0,n)}(i,a);!function(t,e){n[t.getCompareKey()]=e}(i,c)};t.forEach((function(t){return o(t)}));var i=t.map((function(t){return[t,r(t.getCompareKey())]}));return{getInstance:r,instances:n,itemInstancePairs:i}},t.orderDepHierarchy=function(t){var n=[],r=e([],t,!0).orderBy((function(t){return t.getDepsCompareKeys().length})),o=r.map((function(t){return t.getCompareKey()})),i=r.flatMap((function(t){return t.getDepsCompareKeys()})).groupBy((function(t){return t})).map((function(t){return t.key})).filter((function(t){return o.none((function(n){return n===t}))}));if(i.length>0)throw new Error("Missing deps: [".concat(i.join(", "),"]"));for(var a=function(t){n.push(t),r=r.filter((function(n){return n.getCompareKey()!==t.getCompareKey()}))};r.length>0;){for(var c=null,u=0;u<r.length;u++){var s=r[u],l=0===s.getDepsCompareKeys().length,p=s.getDepsCompareKeys().all((function(t){return n.any((function(n){return n.getCompareKey()===t}))}));if(l||p){c=s;break}}if(!c)throw new Error("Dep hierarchy ordering iteration failed.");a(c)}return n},t}();n.XDependency=i},578:function(t,n){var e=this&&this.__spreadArray||function(t,n,e){if(e||2===arguments.length)for(var r,o=0,i=n.length;o<i;o++)!r&&o in n||(r||(r=Array.prototype.slice.call(n,0,o)),r[o]=n[o]);return t.concat(r||Array.prototype.slice.call(n))};Object.defineProperty(n,"__esModule",{value:!0}),n.initJsExtensions=void 0,console.log("Extending prototypes..."),n.initJsExtensions=function(){return 1},String.prototype.trimChar=function(t){return this.replace(new RegExp("^".concat(t,"+|").concat(t,"+$"),"g"),"")},Date.prototype.addDays=function(t){var n=new Date(this.valueOf());return n.setDate(n.getDate()+t),n},Array.prototype.insert=function(t,n){return e(e(e([],this.slice(0,t),!0),[n],!1),this.slice(t),!0)},Array.prototype.groupBy=function(t){var n=[];return this.forEach((function(e){var r=t(e),o=n.filter((function(t){return t.key===r}))[0];o?o.items.push(e):n.push({key:r,items:[e],first:e})})),n},Array.prototype.isDistinctBy=function(t){return!this.groupBy(t).some((function(t){return t.items.length>1}))},Array.prototype.firstOrNull=function(t){t||(t=function(t){return!0});var n=this.filter(t)[0];return null==n?null:n},Array.prototype.lastOrNull=function(t){t||(t=function(t){return!0});var n=this.filter(t),e=n[n.length-1];return null==e?null:e},Array.prototype.last=function(t){var n=t||function(){return!0},e=this.filter(n);if(0===e.length)throw new Error("Last operaion found no matching elements!");return e[e.length-1]},Array.prototype.first=function(t){t||(t=function(t){return!0});var n=this.filter(t);if(0===n.length)throw new Error("First operaion found no matching elements!");return n[0]},Array.prototype.single=function(t){var n=this.filter(null!=t?t:function(){return!0});if(0===n.length)throw new Error("Single operaion found no matching elements!");if(n.length>1)throw new Error("Single operation found more than one matching element!");return n[0]},Array.prototype.singleIndex=function(t){for(var n=[],e=0;e<this.length;e++)t(this[e])&&n.push(e);if(0===n.length)throw new Error("Single operaion found no matching elements!");if(n.length>1)throw new Error("Single operation found more than one matching element!");return n[0]},Array.prototype.firstOrNullIndex=function(t){for(var n,e=[],r=0;r<this.length;r++)t(this[r])&&e.push(r);return null!==(n=e[0])&&void 0!==n?n:null},Array.prototype.byIndexOrNull=function(t){var n=this[t];return void 0===n?null:n},Array.prototype.byIndex=function(t){if(t>=this.length||t<0)throw new Error("Index (".concat(t,") is out of array bounds (0 - ").concat(this.length,")!"));var n=this[t];if(void 0===n)throw new Error("Item is undefined!");return n},Array.prototype.findLastIndex=function(t){var n=this.filter(t);return 0===n.length?null:n.length-1},Array.prototype.all=function(t){return!this.some((function(n){return!t(n)}))},Array.prototype.any=function(t){return t?"function"==typeof t?this.some(t):this.some((function(n){return n===t})):this.some((function(t){return!0}))},Array.prototype.none=function(t){return t?!this.some(t):0===this.length},Array.prototype.remove=function(t){return this.filter((function(n){return!t(n)}))},Array.prototype.orderBy=function(t){return e([],this,!0).sort((function(n,e){return t(n)<t(e)?-1:t(n)>t(e)?1:0}))},Array.prototype.count=function(t){for(var n=0,e=0;e<this.length;e++)t(this[e])&&n++;return n},Array.prototype.each=function(t){for(var n=0;n<this.length;n++)t(this[n]);return this}},360:(t,n,e)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.Polyfills=n.readFileAsText=n.existsSync=n.readFileSync=n.regexMatchAll=n.getAllFilePaths=n.logScoped=n.writeFileSync=void 0;var r=e(147);n.writeFileSync=function(t,n){r.writeFileSync(t,n)},n.logScoped=function(t,n){return console.log("[".concat(t,"] ").concat(n))},n.getAllFilePaths=function(t){return r.readdirSync(t)},n.regexMatchAll=function(t,n){var e;return(null!==(e=t.match(n))&&void 0!==e?e:[]).map((function(t){return""+t}))},n.readFileSync=function(t){try{return r.readFileSync(t,"utf-8")}catch(n){throw new Error("Error reading path: ".concat(t," Msg: ").concat(n.message))}},n.existsSync=function(t){return r.existsSync(t)},n.readFileAsText=function(t){return r.readFileSync(t,"utf-8")},n.Polyfills={readFileAsText:n.readFileAsText,getAllFilePaths:n.getAllFilePaths,parseIntOrFail:function(t,n){var e=parseInt(t);if(Number.isNaN(e))throw new Error('Parsing int param "'.concat(null!=n?n:"-",'" failed.'));return e},getFileName:function(t){return t.split("\\").pop().split("/").pop()}}},147:t=>{t.exports=require("fs")}},n={};function e(r){var o=n[r];if(void 0!==o)return o.exports;var i=n[r]={exports:{}};return t[r].call(i.exports,i,i.exports,e),i.exports}(()=>{e(578);var t=e(360),n=e(993),r=__dirname+"/../../../../packages/backend",o=r+"/deploy",i=r+"/sql",a=i+"/migrations",c=function(n){return t.Polyfills.parseIntOrFail(n.replace("migration",""))};process.on("uncaughtException",(function(t){console.error("---- FATAL ERROR -----"),console.error(t)})),function(){var e=function(n){var e=function(){var n=function(){var n=t.Polyfills.readFileAsText(o+"/out/migrationVersionsOnServer.txt").split("\n").map((function(t){return t.replace(" ","").replace("\r","")})).filter((function(t){return!!t}));if(!n.any())throw new Error("Server has no version migration history. Create it manually.");return n}().orderBy((function(t){return c(t)})).last();return c(n)}();return console.log("Latest version on server: ".concat(e)),t.Polyfills.getAllFilePaths(n).map((function(n){return t.Polyfills.getFileName(n).replace(".sql","")})).filter((function(t){return c(t)>e})).orderBy((function(t){return c(t)}))}(a);console.log("Missing versions: ".concat(e.join(", ")));var r=new n.SoftSchemaScriptService(i).getSoftSchemaScript(),u=function(n){var e=n.createMigrationsTableScript,r=n.migrationVersions,o=n.dropSoftSchemaScript,a=n.softSchemaCreateScript,c=r.map((function(t){return"\n-- MIGRATION: ".concat(t,"\nINSERT INTO public.migration_version\nVALUES ('").concat(t,"', now()); ")})).join("\n"),u=r.map((function(n){return"--MIGRATION: ".concat(n,"\n").concat(t.Polyfills.readFileAsText("".concat(i,"/migrations/").concat(n,".sql")))})).join("\n\n");return"\n-- MIGRATION VERSIONS: ".concat(r.join(", "),"\n\n-- BEGIN TRANSACTION\nBEGIN;\n\n-- CREATE MIGARTION VERSION TABLE\n").concat(e,"\n\n-- STORE MIGRATION VERSION\n").concat(c,"\n\n-- DROP SOFT SCHEMA\n").concat(o,"\n\n-- EXECUTE MIGRATIONS \n").concat(u,"\n\n-- CREATE SOFT SCHEMA\n").concat(a,"\n\n-- COMMIT TRANSACTION\nCOMMIT;\n")}({createMigrationsTableScript:t.Polyfills.readFileAsText("".concat(o,"/sql/createMigrationVersionTable.sql")),softSchemaCreateScript:r,dropSoftSchemaScript:t.Polyfills.readFileAsText("".concat(o,"/sql/dropSoftSchema.sql")),migrationVersions:e});(0,t.writeFileSync)(o+"/out/fullMigrationScript.sql",u),(0,t.writeFileSync)(o+"/out/softSchemaCreateScript.sql",r)}()})()})();