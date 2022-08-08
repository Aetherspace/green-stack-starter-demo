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
            if (process.env.NODE_ENV !== 'development') {
                return (0, react_1.createElement)('div', {}, process.env.NODE_ENV);
            }
            return (0, react_1.createElement)('iframe', {
                style: { width: '100%', height: '100%' },
                src: 'http://localhost:3000/api/graphql',
            });
        },
    });
});
