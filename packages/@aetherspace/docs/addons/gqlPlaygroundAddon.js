"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var addons_1 = require("@storybook/addons");
addons_1.addons.register('/graphql', function () {
    addons_1.addons.add('graphql-playground/tab', {
        type: addons_1.types.TAB,
        title: 'GraphQL',
        route: function (_a) {
            var storyId = _a.storyId;
            return "/graphql/".concat(storyId);
        },
        match: function (_a) {
            var viewMode = _a.viewMode;
            return viewMode === 'graphql';
        },
        render: function () {
            var graphqlUrl = 'http://localhost:3000/api/graphql';
            var isDev = process.env.NODE_ENV === 'development';
            if (!isDev)
                graphqlUrl = "".concat(process.env.STORYBOOK_BACKEND_URL, "/api/graphql");
            return (0, react_1.createElement)('iframe', {
                style: { width: '100%', height: '100%' },
                src: graphqlUrl,
            });
        },
    });
});
