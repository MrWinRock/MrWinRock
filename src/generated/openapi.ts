/* eslint-disable */
/** Generated from mrwinrock-app/docs/openapi.json. Do not edit. */
export interface paths {
    "/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getIndex"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/about": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getAdminAbout"];
        put: operations["putAdminAbout"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch: operations["patchAdminAbout"];
        trace?: never;
    };
    "/admin/contact": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["postAdminContact"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/experiences": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getAdminExperiences"];
        put?: never;
        post: operations["postAdminExperiences"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/experiences/reorder": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch: operations["patchAdminExperiencesReorder"];
        trace?: never;
    };
    "/admin/experiences/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put: operations["putAdminExperiencesById"];
        post?: never;
        delete: operations["deleteAdminExperiencesById"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/health": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getAdminHealth"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/health/ready": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getAdminHealthReady"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/projects": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getAdminProjects"];
        put?: never;
        post: operations["postAdminProjects"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/projects/reorder": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch: operations["patchAdminProjectsReorder"];
        trace?: never;
    };
    "/admin/projects/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put: operations["putAdminProjectsById"];
        post?: never;
        delete: operations["deleteAdminProjectsById"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/resume": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getAdminResume"];
        put: operations["putAdminResume"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/settings": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getAdminSettings"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch: operations["patchAdminSettings"];
        trace?: never;
    };
    "/admin/skills": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getAdminSkills"];
        put?: never;
        post: operations["postAdminSkills"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/skills/reorder": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch: operations["patchAdminSkillsReorder"];
        trace?: never;
    };
    "/admin/skills/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put: operations["putAdminSkillsById"];
        post?: never;
        delete: operations["deleteAdminSkillsById"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/about": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiAbout"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/contact": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["postApiContact"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/experiences": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiExperiences"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/health": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiHealth"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/health/ready": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiHealthReady"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/projects": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiProjects"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/resume": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiResume"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/settings": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiSettings"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/skills": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiSkills"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/fish": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getFish"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/health": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getHealth"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: never;
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    getIndex: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        message: string;
                        /** @constant */
                        ok: true;
                    };
                };
            };
        };
    };
    getAdminAbout: {
        parameters: {
            query?: {
                lang?: "en" | "th";
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            background: string;
                            story: string;
                        };
                        /** @constant */
                        ok: true;
                    };
                };
            };
            /** @description Response for status 400 */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 401 */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 403 */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
        };
    };
    putAdminAbout: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    background: {
                        en: string;
                        th: string;
                    };
                    story: {
                        en: string;
                        th: string;
                    };
                };
            };
        };
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            background: {
                                en: string;
                                th: string;
                            };
                            story: {
                                en: string;
                                th: string;
                            };
                        };
                        /** @constant */
                        ok: true;
                    };
                };
            };
            /** @description Response for status 400 */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 401 */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 403 */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
        };
    };
    patchAdminAbout: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    background?: {
                        en?: string;
                        th?: string;
                    };
                    story: {
                        en: string;
                        th?: string;
                    } | {
                        en?: string;
                        th: string;
                    };
                } | {
                    background: {
                        en: string;
                        th?: string;
                    } | {
                        en?: string;
                        th: string;
                    };
                    story?: {
                        en?: string;
                        th?: string;
                    };
                };
            };
        };
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            background: {
                                en: string;
                                th: string;
                            };
                            story: {
                                en: string;
                                th: string;
                            };
                        };
                        /** @constant */
                        ok: true;
                    };
                };
            };
            /** @description Response for status 400 */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 401 */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 403 */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
        };
    };
    postAdminContact: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** Format: email */
                    email: string;
                    message: string;
                    name: string;
                };
            };
        };
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        message: string;
                        /** @constant */
                        ok: true;
                    };
                };
            };
            /** @description Response for status 400 */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 401 */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 403 */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 502 */
            502: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 503 */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
        };
    };
    getAdminExperiences: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            _id?: string;
                            /** @default [] */
                            achievements: string[];
                            company: string;
                            description: string;
                            endDate?: string;
                            location: string;
                            /** @default 0 */
                            order: number;
                            startDate: string;
                            /** @default [] */
                            tech: string[];
                            title: string;
                            /** @enum {string} */
                            type: "Full-time" | "Part-time" | "Internship" | "Freelance" | "Contract" | "Bachelor" | "Master" | "PhD";
                        }[];
                        /** @constant */
                        ok: true;
                    };
                };
            };
            /** @description Response for status 401 */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 403 */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
        };
    };
    postAdminExperiences: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @default [] */
                    achievements?: string[];
                    company: string;
                    description: string;
                    endDate?: string;
                    location: string;
                    startDate: string;
                    /** @default [] */
                    tech?: string[];
                    title: string;
                    /** @enum {string} */
                    type: "Full-time" | "Part-time" | "Internship" | "Freelance" | "Contract" | "Bachelor" | "Master" | "PhD";
                };
            };
        };
        responses: {
            /** @description Response for status 201 */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            _id?: string;
                            /** @default [] */
                            achievements: string[];
                            company: string;
                            description: string;
                            endDate?: string;
                            location: string;
                            /** @default 0 */
                            order: number;
                            startDate: string;
                            /** @default [] */
                            tech: string[];
                            title: string;
                            /** @enum {string} */
                            type: "Full-time" | "Part-time" | "Internship" | "Freelance" | "Contract" | "Bachelor" | "Master" | "PhD";
                        };
                        /** @constant */
                        ok: true;
                    };
                };
            };
            /** @description Response for status 400 */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 401 */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 403 */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
        };
    };
    patchAdminExperiencesReorder: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    items: {
                        id: string;
                        order: number;
                    }[];
                };
            };
        };
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            _id?: string;
                            /** @default [] */
                            achievements: string[];
                            company: string;
                            description: string;
                            endDate?: string;
                            location: string;
                            /** @default 0 */
                            order: number;
                            startDate: string;
                            /** @default [] */
                            tech: string[];
                            title: string;
                            /** @enum {string} */
                            type: "Full-time" | "Part-time" | "Internship" | "Freelance" | "Contract" | "Bachelor" | "Master" | "PhD";
                        }[];
                        /** @constant */
                        ok: true;
                    };
                };
            };
            /** @description Response for status 400 */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 401 */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 403 */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
        };
    };
    putAdminExperiencesById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @default [] */
                    achievements?: string[];
                    company: string;
                    description: string;
                    endDate?: string;
                    location: string;
                    /** @default 0 */
                    order?: number;
                    startDate: string;
                    /** @default [] */
                    tech?: string[];
                    title: string;
                    /** @enum {string} */
                    type: "Full-time" | "Part-time" | "Internship" | "Freelance" | "Contract" | "Bachelor" | "Master" | "PhD";
                };
            };
        };
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            _id?: string;
                            /** @default [] */
                            achievements: string[];
                            company: string;
                            description: string;
                            endDate?: string;
                            location: string;
                            /** @default 0 */
                            order: number;
                            startDate: string;
                            /** @default [] */
                            tech: string[];
                            title: string;
                            /** @enum {string} */
                            type: "Full-time" | "Part-time" | "Internship" | "Freelance" | "Contract" | "Bachelor" | "Master" | "PhD";
                        };
                        /** @constant */
                        ok: true;
                    };
                };
            };
            /** @description Response for status 400 */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 401 */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 403 */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 404 */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
        };
    };
    deleteAdminExperiencesById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        ok: true;
                    };
                };
            };
            /** @description Response for status 400 */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 401 */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 403 */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
        };
    };
    getAdminHealth: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        ok: true;
                        /** @constant */
                        status: "live";
                        /** Format: date-time */
                        timestamp: string;
                        uptime: number;
                    };
                };
            };
            /** @description Response for status 401 */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 403 */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
        };
    };
    getAdminHealthReady: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        ok: true;
                        /** @constant */
                        status: "live";
                    };
                };
            };
            /** @description Response for status 401 */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 403 */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 503 */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
        };
    };
    getAdminProjects: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            _id?: string;
                            description: string;
                            /** @default 0 */
                            order: number;
                            /** Format: uri */
                            repo?: string;
                            /** @default [] */
                            tech: string[];
                            title: string;
                            /** Format: uri */
                            url?: string;
                        }[];
                        /** @constant */
                        ok: true;
                    };
                };
            };
            /** @description Response for status 401 */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 403 */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
        };
    };
    postAdminProjects: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    description: string;
                    /** Format: uri */
                    repo?: string;
                    /** @default [] */
                    tech?: string[];
                    title: string;
                    /** Format: uri */
                    url?: string;
                };
            };
        };
        responses: {
            /** @description Response for status 201 */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            _id?: string;
                            description: string;
                            /** @default 0 */
                            order: number;
                            /** Format: uri */
                            repo?: string;
                            /** @default [] */
                            tech: string[];
                            title: string;
                            /** Format: uri */
                            url?: string;
                        };
                        /** @constant */
                        ok: true;
                    };
                };
            };
            /** @description Response for status 400 */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 401 */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 403 */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
        };
    };
    patchAdminProjectsReorder: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    items: {
                        id: string;
                        order: number;
                    }[];
                };
            };
        };
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            _id?: string;
                            description: string;
                            /** @default 0 */
                            order: number;
                            /** Format: uri */
                            repo?: string;
                            /** @default [] */
                            tech: string[];
                            title: string;
                            /** Format: uri */
                            url?: string;
                        }[];
                        /** @constant */
                        ok: true;
                    };
                };
            };
            /** @description Response for status 400 */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 401 */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 403 */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
        };
    };
    putAdminProjectsById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    description: string;
                    /** @default 0 */
                    order?: number;
                    /** Format: uri */
                    repo?: string;
                    /** @default [] */
                    tech?: string[];
                    title: string;
                    /** Format: uri */
                    url?: string;
                };
            };
        };
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            _id?: string;
                            description: string;
                            /** @default 0 */
                            order: number;
                            /** Format: uri */
                            repo?: string;
                            /** @default [] */
                            tech: string[];
                            title: string;
                            /** Format: uri */
                            url?: string;
                        };
                        /** @constant */
                        ok: true;
                    };
                };
            };
            /** @description Response for status 400 */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 401 */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 403 */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 404 */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
        };
    };
    deleteAdminProjectsById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        ok: true;
                    };
                };
            };
            /** @description Response for status 400 */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 401 */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 403 */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
        };
    };
    getAdminResume: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    /** @description Resume responses are not cached. */
                    "Cache-Control"?: string;
                    /** @description Inline PDF filename. */
                    "Content-Disposition"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/pdf": string;
                };
            };
            /** @description Response for status 401 */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                    "text/plain": string;
                };
            };
            /** @description Response for status 403 */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                    "text/plain": string;
                };
            };
            /** @description Response for status 404 */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 500 */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Upstream resume service returned another HTTP status. */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
        };
    };
    putAdminResume: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "multipart/form-data": {
                    /**
                     * Format: binary
                     * @description PDF content validated by byte signature; browser metadata is not trusted.
                     */
                    file: string;
                };
            };
        };
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            /** Format: uri */
                            url: string;
                        };
                        /** @constant */
                        ok: true;
                    };
                };
            };
            /** @description Response for status 400 */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 401 */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 403 */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 413 */
            413: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 500 */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
        };
    };
    getAdminSettings: {
        parameters: {
            query?: never;
            header?: {
                "if-none-match"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    /** @description Requires revalidation while allowing conditional requests. */
                    "Cache-Control"?: string;
                    /** @description Strong validator for the current settings representation. */
                    ETag?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            /** @default true */
                            showAbout: boolean;
                            /** @default true */
                            showContact: boolean;
                            /** @default true */
                            showExperience: boolean;
                            /** @default true */
                            showProjects: boolean;
                            /** @default true */
                            showResume: boolean;
                            /** @default true */
                            showSkills: boolean;
                        };
                        /** @constant */
                        ok: true;
                    };
                };
            };
            /** @description Response for status 304 */
            304: {
                headers: {
                    /** @description Requires revalidation while allowing conditional requests. */
                    "Cache-Control"?: string;
                    /** @description Strong validator for the current settings representation. */
                    ETag?: string;
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Response for status 401 */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 403 */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
        };
    };
    patchAdminSettings: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    showAbout: boolean;
                    showContact?: boolean;
                    showExperience?: boolean;
                    showProjects?: boolean;
                    showResume?: boolean;
                    showSkills?: boolean;
                } | {
                    showAbout?: boolean;
                    showContact?: boolean;
                    showExperience?: boolean;
                    showProjects?: boolean;
                    showResume?: boolean;
                    showSkills: boolean;
                } | {
                    showAbout?: boolean;
                    showContact?: boolean;
                    showExperience?: boolean;
                    showProjects: boolean;
                    showResume?: boolean;
                    showSkills?: boolean;
                } | {
                    showAbout?: boolean;
                    showContact?: boolean;
                    showExperience: boolean;
                    showProjects?: boolean;
                    showResume?: boolean;
                    showSkills?: boolean;
                } | {
                    showAbout?: boolean;
                    showContact?: boolean;
                    showExperience?: boolean;
                    showProjects?: boolean;
                    showResume: boolean;
                    showSkills?: boolean;
                } | {
                    showAbout?: boolean;
                    showContact: boolean;
                    showExperience?: boolean;
                    showProjects?: boolean;
                    showResume?: boolean;
                    showSkills?: boolean;
                };
            };
        };
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            /** @default true */
                            showAbout: boolean;
                            /** @default true */
                            showContact: boolean;
                            /** @default true */
                            showExperience: boolean;
                            /** @default true */
                            showProjects: boolean;
                            /** @default true */
                            showResume: boolean;
                            /** @default true */
                            showSkills: boolean;
                        };
                        /** @constant */
                        ok: true;
                    };
                };
            };
            /** @description Response for status 400 */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 401 */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 403 */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
        };
    };
    getAdminSkills: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            [key: string]: {
                                order_flag: number;
                                skills: {
                                    _id?: string;
                                    category?: string;
                                    /** Format: uri */
                                    icon?: string;
                                    name: string;
                                    /** @default 0 */
                                    order: number;
                                }[];
                            };
                        };
                        /** @constant */
                        ok: true;
                    };
                };
            };
            /** @description Response for status 401 */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 403 */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
        };
    };
    postAdminSkills: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    category?: string;
                    /** Format: uri */
                    icon?: string;
                    name: string;
                };
                "multipart/form-data": {
                    category?: string;
                    icon?: string;
                    name: string;
                };
            };
        };
        responses: {
            /** @description Response for status 201 */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            _id?: string;
                            category?: string;
                            /** Format: uri */
                            icon?: string;
                            name: string;
                            /** @default 0 */
                            order: number;
                        };
                        /** @constant */
                        ok: true;
                    };
                };
            };
            /** @description Response for status 400 */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 401 */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 403 */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 413 */
            413: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 500 */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
        };
    };
    patchAdminSkillsReorder: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    items: {
                        id: string;
                        order: number;
                    }[];
                };
            };
        };
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            [key: string]: {
                                order_flag: number;
                                skills: {
                                    _id?: string;
                                    category?: string;
                                    /** Format: uri */
                                    icon?: string;
                                    name: string;
                                    /** @default 0 */
                                    order: number;
                                }[];
                            };
                        };
                        /** @constant */
                        ok: true;
                    };
                };
            };
            /** @description Response for status 400 */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 401 */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 403 */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
        };
    };
    putAdminSkillsById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    category?: string;
                    /** Format: uri */
                    icon?: string;
                    name: string;
                    /** @default 0 */
                    order?: number;
                };
                "multipart/form-data": {
                    category?: string;
                    icon?: string;
                    name: string;
                    /** @default 0 */
                    order?: number;
                };
            };
        };
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            _id?: string;
                            category?: string;
                            /** Format: uri */
                            icon?: string;
                            name: string;
                            /** @default 0 */
                            order: number;
                        };
                        /** @constant */
                        ok: true;
                    };
                };
            };
            /** @description Response for status 400 */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 401 */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 403 */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 404 */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 413 */
            413: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 500 */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
        };
    };
    deleteAdminSkillsById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        ok: true;
                    };
                };
            };
            /** @description Response for status 400 */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 401 */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 403 */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/plain": string;
                };
            };
            /** @description Response for status 404 */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
        };
    };
    getApiAbout: {
        parameters: {
            query?: {
                lang?: "en" | "th";
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            background: string;
                            story: string;
                        };
                        /** @constant */
                        ok: true;
                    };
                };
            };
            /** @description Response for status 400 */
            400: {
                headers: {
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 403 */
            403: {
                headers: {
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 429 */
            429: {
                headers: {
                    /** @description Seconds to wait before retrying the request. */
                    "Retry-After"?: string;
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
        };
    };
    postApiContact: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** Format: email */
                    email: string;
                    message: string;
                    name: string;
                };
            };
        };
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        message: string;
                        /** @constant */
                        ok: true;
                    };
                };
            };
            /** @description Response for status 400 */
            400: {
                headers: {
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 403 */
            403: {
                headers: {
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 429 */
            429: {
                headers: {
                    /** @description Seconds to wait before retrying the request. */
                    "Retry-After"?: string;
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 502 */
            502: {
                headers: {
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 503 */
            503: {
                headers: {
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
        };
    };
    getApiExperiences: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            _id?: string;
                            /** @default [] */
                            achievements: string[];
                            company: string;
                            description: string;
                            endDate?: string;
                            location: string;
                            /** @default 0 */
                            order: number;
                            startDate: string;
                            /** @default [] */
                            tech: string[];
                            title: string;
                            /** @enum {string} */
                            type: "Full-time" | "Part-time" | "Internship" | "Freelance" | "Contract" | "Bachelor" | "Master" | "PhD";
                        }[];
                        /** @constant */
                        ok: true;
                    };
                };
            };
            /** @description Response for status 403 */
            403: {
                headers: {
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 429 */
            429: {
                headers: {
                    /** @description Seconds to wait before retrying the request. */
                    "Retry-After"?: string;
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
        };
    };
    getApiHealth: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        ok: true;
                        /** @constant */
                        status: "live";
                        /** Format: date-time */
                        timestamp: string;
                        uptime: number;
                    };
                };
            };
            /** @description Response for status 429 */
            429: {
                headers: {
                    /** @description Seconds to wait before retrying the request. */
                    "Retry-After"?: string;
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
        };
    };
    getApiHealthReady: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        ok: true;
                        /** @constant */
                        status: "live";
                    };
                };
            };
            /** @description Response for status 429 */
            429: {
                headers: {
                    /** @description Seconds to wait before retrying the request. */
                    "Retry-After"?: string;
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 503 */
            503: {
                headers: {
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
        };
    };
    getApiProjects: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            _id?: string;
                            description: string;
                            /** @default 0 */
                            order: number;
                            /** Format: uri */
                            repo?: string;
                            /** @default [] */
                            tech: string[];
                            title: string;
                            /** Format: uri */
                            url?: string;
                        }[];
                        /** @constant */
                        ok: true;
                    };
                };
            };
            /** @description Response for status 403 */
            403: {
                headers: {
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 429 */
            429: {
                headers: {
                    /** @description Seconds to wait before retrying the request. */
                    "Retry-After"?: string;
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
        };
    };
    getApiResume: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    /** @description Resume responses are not cached. */
                    "Cache-Control"?: string;
                    /** @description Inline PDF filename. */
                    "Content-Disposition"?: string;
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/pdf": string;
                };
            };
            /** @description Response for status 403 */
            403: {
                headers: {
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 404 */
            404: {
                headers: {
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 429 */
            429: {
                headers: {
                    /** @description Seconds to wait before retrying the request. */
                    "Retry-After"?: string;
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 500 */
            500: {
                headers: {
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Upstream resume service returned another HTTP status. */
            default: {
                headers: {
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
        };
    };
    getApiSettings: {
        parameters: {
            query?: never;
            header?: {
                "if-none-match"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    /** @description Requires revalidation while allowing conditional requests. */
                    "Cache-Control"?: string;
                    /** @description Strong validator for the current settings representation. */
                    ETag?: string;
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            /** @default true */
                            showAbout: boolean;
                            /** @default true */
                            showContact: boolean;
                            /** @default true */
                            showExperience: boolean;
                            /** @default true */
                            showProjects: boolean;
                            /** @default true */
                            showResume: boolean;
                            /** @default true */
                            showSkills: boolean;
                        };
                        /** @constant */
                        ok: true;
                    };
                };
            };
            /** @description Response for status 304 */
            304: {
                headers: {
                    /** @description Requires revalidation while allowing conditional requests. */
                    "Cache-Control"?: string;
                    /** @description Strong validator for the current settings representation. */
                    ETag?: string;
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Response for status 429 */
            429: {
                headers: {
                    /** @description Seconds to wait before retrying the request. */
                    "Retry-After"?: string;
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
        };
    };
    getApiSkills: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            [key: string]: {
                                order_flag: number;
                                skills: {
                                    _id?: string;
                                    category?: string;
                                    /** Format: uri */
                                    icon?: string;
                                    name: string;
                                    /** @default 0 */
                                    order: number;
                                }[];
                            };
                        };
                        /** @constant */
                        ok: true;
                    };
                };
            };
            /** @description Response for status 403 */
            403: {
                headers: {
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
            /** @description Response for status 429 */
            429: {
                headers: {
                    /** @description Seconds to wait before retrying the request. */
                    "Retry-After"?: string;
                    /** @description Configured request limit. */
                    "X-RateLimit-Limit"?: string;
                    /** @description Requests remaining in the active limit window. */
                    "X-RateLimit-Remaining"?: string;
                    /** @description Unix timestamp when the active limit window resets. */
                    "X-RateLimit-Reset"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
        };
    };
    getFish: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        fish: string;
                    };
                };
            };
        };
    };
    getHealth: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Response for status 200 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @constant */
                        ok: true;
                        /** @constant */
                        status: "live";
                    };
                };
            };
            /** @description Response for status 503 */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        details?: {
                            fieldErrors: {
                                [key: string]: string[];
                            };
                            formErrors: string[];
                        };
                        error: string;
                        /** @constant */
                        ok: false;
                    };
                };
            };
        };
    };
}
