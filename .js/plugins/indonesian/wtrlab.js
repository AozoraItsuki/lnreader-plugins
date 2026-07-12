"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var fetch_1 = require("@libs/fetch");
var filterInputs_1 = require("@libs/filterInputs");
var cheerio_1 = require("cheerio");
var aes_1 = require("@libs/aes");
var WTRLAB = /** @class */ (function () {
    function WTRLAB() {
        this.id = 'WTRLAB';
        this.name = 'WTR-LAB';
        this.site = 'https://wtr-lab.com/';
        this.version = '1.6.3';
        this.icon = 'src/id/wtrlab/icon.png';
        this.sourceLang = 'en/';
        this.baggage = '';
        this.trace = '';
        this.buildId = '';
        this.tagIdMap = new Map();
        this.genreIdMap = new Map();
        this.filters = {
            search: {
                value: '',
                label: 'Search',
                type: filterInputs_1.FilterTypes.TextInput,
            },
            orderBy: {
                value: 'update',
                label: 'Order by',
                options: [
                    { label: 'Update Date', value: 'update' },
                    { label: 'Addition Date', value: 'date' },
                    { label: 'Random', value: 'random' },
                    { label: 'Weekly View', value: 'weekly_rank' },
                    { label: 'Monthly View', value: 'monthly_rank' },
                    { label: 'All-Time View', value: 'view' },
                    { label: 'Name', value: 'name' },
                    { label: 'Reader', value: 'reader' },
                    { label: 'Chapter', value: 'chapter' },
                    { label: 'Rating', value: 'rating' },
                    { label: 'Review Count', value: 'total_rate' },
                    { label: 'Vote Count', value: 'vote' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
            order: {
                value: 'desc',
                label: 'Order',
                options: [
                    { label: 'Descending', value: 'desc' },
                    { label: 'Ascending', value: 'asc' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
            status: {
                value: 'all',
                label: 'Status',
                options: [
                    { label: 'All', value: 'all' },
                    { label: 'Ongoing', value: 'ongoing' },
                    { label: 'Completed', value: 'completed' },
                    { label: 'Hiatus', value: 'hiatus' },
                    { label: 'Dropped', value: 'dropped' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
            release_status: {
                value: 'all',
                label: 'Release Status',
                options: [
                    { label: 'All', value: 'all' },
                    { label: 'Released', value: 'released' },
                    { label: 'On Voting', value: 'voting' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
            addition_age: {
                value: 'all',
                label: 'Addition Age',
                options: [
                    { label: 'All', value: 'all' },
                    { label: '< 2 Days', value: 'day' },
                    { label: '< 1 Week', value: 'week' },
                    { label: '< 1 Month', value: 'month' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
            min_chapters: {
                value: '',
                label: 'Minimum Chapters',
                type: filterInputs_1.FilterTypes.TextInput,
            },
            min_rating: {
                value: '',
                label: 'Minimum Rating (0.0-5.0)',
                type: filterInputs_1.FilterTypes.TextInput,
            },
            min_review_count: {
                value: '',
                label: 'Minimum Review Count',
                type: filterInputs_1.FilterTypes.TextInput,
            },
            genre_operator: {
                value: 'and',
                label: 'Genre (And/Or)',
                options: [
                    { label: 'And', value: 'and' },
                    { label: 'Or', value: 'or' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
            genres: {
                label: 'Genres',
                type: filterInputs_1.FilterTypes.ExcludableCheckboxGroup,
                value: {
                    include: [],
                    exclude: [],
                },
                options: [
                    { label: 'Action', value: '1' },
                    { label: 'Adult', value: '2' },
                    { label: 'Adventure', value: '3' },
                    { label: 'Comedy', value: '4' },
                    { label: 'Drama', value: '5' },
                    { label: 'Ecchi', value: '6' },
                    { label: 'Erciyuan', value: '7' },
                    { label: 'Fan-Fiction', value: '8' },
                    { label: 'Fantasy', value: '9' },
                    { label: 'Game', value: '10' },
                    { label: 'Gender-Bender', value: '11' },
                    { label: 'Harem', value: '12' },
                    { label: 'Historical', value: '13' },
                    { label: 'Horror', value: '14' },
                    { label: 'Josei', value: '15' },
                    { label: 'Martial-Arts', value: '16' },
                    { label: 'Mature', value: '17' },
                    { label: 'Mecha', value: '18' },
                    { label: 'Military', value: '19' },
                    { label: 'Mystery', value: '20' },
                    { label: 'Psychological', value: '21' },
                    { label: 'Romance', value: '22' },
                    { label: 'School-Life', value: '23' },
                    { label: 'Sci-Fi', value: '24' },
                    { label: 'Seinen', value: '25' },
                    { label: 'Shoujo', value: '26' },
                    { label: 'Shoujo-Ai', value: '27' },
                    { label: 'Shounen', value: '28' },
                    { label: 'Shounen-Ai', value: '29' },
                    { label: 'Slice-Of-Life', value: '30' },
                    { label: 'Smut', value: '31' },
                    { label: 'Sports', value: '32' },
                    { label: 'Supernatural', value: '33' },
                    { label: 'Tragedy', value: '34' },
                    { label: 'Urban-Life', value: '35' },
                    { label: 'Wuxia', value: '36' },
                    { label: 'Xianxia', value: '37' },
                    { label: 'Xuanhuan', value: '38' },
                    { label: 'Yaoi', value: '39' },
                    { label: 'Yuri', value: '40' },
                ],
            },
            tag_operator: {
                value: 'and',
                label: 'Tag (And/Or)',
                options: [
                    { label: 'And', value: 'and' },
                    { label: 'Or', value: 'or' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
            tags: {
                label: 'Tags',
                type: filterInputs_1.FilterTypes.ExcludableCheckboxGroup,
                value: {
                    include: [],
                    exclude: [],
                },
                options: [
                    {
                        label: '(Load novel list to populate tags)',
                        value: '__placeholder__',
                    },
                ],
            },
            folders: {
                value: '',
                label: 'Library Folders',
                options: [
                    { label: 'No Filter', value: '' },
                    { label: 'Reading', value: '1' },
                    { label: 'Read Later', value: '2' },
                    { label: 'Completed', value: '3' },
                    { label: 'Trash', value: '5' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
            library_exclude: {
                value: '',
                label: 'Library Exclude',
                options: [
                    { label: 'None', value: '' },
                    { label: 'Exclude All', value: 'history' },
                    { label: 'Exclude Trash', value: 'trash' },
                    { label: 'Exclude Library & Trash', value: 'in_library' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
        };
    }
    Object.defineProperty(WTRLAB.prototype, "headers", {
        get: function () {
            return {
                baggage: this.baggage,
                'sentry-trace': this.trace,
            };
        },
        enumerable: false,
        configurable: true
    });
    WTRLAB.prototype.popularNovels = function (page_1, _a) {
        return __awaiter(this, arguments, void 0, function (page, _b) {
            var link, params, response, recentNovel, novels, finderPage, finderCheerio, nextData, response, json, seenIds_1, novels;
            var _this = this;
            var _c, _d, _e, _f, _g, _h;
            var showLatestNovels = _b.showLatestNovels, filters = _b.filters;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        link = this.site + this.sourceLang + 'novel-list?';
                        params = new URLSearchParams();
                        params.append('orderBy', filters.orderBy.value);
                        params.append('order', filters.order.value);
                        params.append('status', filters.status.value);
                        params.append('release_status', filters.release_status.value);
                        params.append('addition_age', filters.addition_age.value);
                        params.append('page', page.toString());
                        if (filters.search.value) {
                            params.append('text', filters.search.value);
                        }
                        if (((_c = filters.genres.value) === null || _c === void 0 ? void 0 : _c.include) &&
                            filters.genres.value.include.length > 0) {
                            params.append('gi', filters.genres.value.include.join(','));
                            params.append('gc', filters.genre_operator.value);
                        }
                        if (((_d = filters.genres.value) === null || _d === void 0 ? void 0 : _d.exclude) &&
                            filters.genres.value.exclude.length > 0) {
                            params.append('ge', filters.genres.value.exclude.join(','));
                        }
                        if (((_e = filters.tags.value) === null || _e === void 0 ? void 0 : _e.include) && filters.tags.value.include.length > 0) {
                            params.append('ti', filters.tags.value.include.join(','));
                            params.append('tc', filters.tag_operator.value);
                        }
                        if (((_f = filters.tags.value) === null || _f === void 0 ? void 0 : _f.exclude) && filters.tags.value.exclude.length > 0) {
                            params.append('te', filters.tags.value.exclude.join(','));
                        }
                        if (filters.folders.value) {
                            params.append('folders', filters.folders.value);
                        }
                        if (filters.library_exclude.value) {
                            params.append('le', filters.library_exclude.value);
                        }
                        if (filters.min_chapters.value) {
                            params.append('minc', filters.min_chapters.value);
                        }
                        if (filters.min_rating.value) {
                            params.append('minr', filters.min_rating.value);
                        }
                        if (filters.min_review_count.value) {
                            params.append('minrc', filters.min_review_count.value);
                        }
                        if (!showLatestNovels) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(this.site + 'api/home/recent', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ page: page }),
                            })];
                    case 1:
                        response = _j.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        recentNovel = _j.sent();
                        novels = recentNovel.data.map(function (datum) { return ({
                            name: datum.serie.data.title || datum.serie.slug || '',
                            cover: datum.serie.data.image,
                            path: _this.sourceLang +
                                'serie-' +
                                datum.serie.raw_id +
                                '/' +
                                datum.serie.slug || '',
                        }); });
                        return [2 /*return*/, novels];
                    case 3:
                        if (!!this.buildId) return [3 /*break*/, 5];
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(this.site + 'en/novel-finder').then(function (res) { return res.text(); })];
                    case 4:
                        finderPage = _j.sent();
                        finderCheerio = (0, cheerio_1.load)(finderPage);
                        nextData = finderCheerio('#__NEXT_DATA__').html();
                        if (!nextData) {
                            throw new Error('Could not find __NEXT_DATA__ on novel finder page');
                        }
                        this.buildId = JSON.parse(nextData).buildId;
                        _j.label = 5;
                    case 5:
                        link = "".concat(this.site, "_next/data/").concat(this.buildId, "/en/novel-finder.json?").concat(params.toString());
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(link)];
                    case 6:
                        response = _j.sent();
                        return [4 /*yield*/, response.json()];
                    case 7:
                        json = _j.sent();
                        if (this.tagIdMap.size === 0 && ((_h = (_g = json.pageProps) === null || _g === void 0 ? void 0 : _g.tags) === null || _h === void 0 ? void 0 : _h.ungrouped)) {
                            this.populateTagMap(json);
                        }
                        seenIds_1 = new Set();
                        novels = json.pageProps.series
                            .filter(function (novel) {
                            if (seenIds_1.has(novel.raw_id)) {
                                return false;
                            }
                            seenIds_1.add(novel.raw_id);
                            return true;
                        })
                            .map(function (novel) { return ({
                            name: novel.data.title,
                            cover: novel.data.image,
                            path: "".concat(_this.sourceLang, "serie-").concat(novel.raw_id, "/").concat(novel.slug),
                        }); });
                        return [2 /*return*/, novels];
                }
            });
        });
    };
    WTRLAB.prototype.populateTagMap = function (json) {
        var _a, _b, _c, _d, _e, _f;
        var ungrouped = (_c = (_b = (_a = json.pageProps) === null || _a === void 0 ? void 0 : _a.tags) === null || _b === void 0 ? void 0 : _b.ungrouped) !== null && _c !== void 0 ? _c : [];
        var groups = (_f = (_e = (_d = json.pageProps) === null || _d === void 0 ? void 0 : _d.tags) === null || _e === void 0 ? void 0 : _e.groups) !== null && _f !== void 0 ? _f : [];
        this.tagIdMap = new Map(ungrouped.map(function (t) { return [String(t.value), t.label]; }));
        this.filters.tags.options = __spreadArray(__spreadArray([], ungrouped.map(function (t) { return ({ label: t.label, value: String(t.value) }); }), true), groups.map(function (t) { return ({ label: t.name, value: String(t.id) }); }), true).sort(function (a, b) { return a.label.localeCompare(b.label); });
    };
    WTRLAB.prototype.ensureTagMap = function () {
        return __awaiter(this, void 0, void 0, function () {
            var finderPage, finderCheerio, nextData, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.tagIdMap.size > 0)
                            return [2 /*return*/];
                        if (!!this.buildId) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(this.site + 'en/novel-finder').then(function (res) { return res.text(); })];
                    case 1:
                        finderPage = _a.sent();
                        finderCheerio = (0, cheerio_1.load)(finderPage);
                        nextData = finderCheerio('#__NEXT_DATA__').html();
                        if (!nextData)
                            throw new Error('Could not find __NEXT_DATA__ on novel finder page');
                        this.buildId = JSON.parse(nextData).buildId;
                        _a.label = 2;
                    case 2: return [4 /*yield*/, (0, fetch_1.fetchApi)("".concat(this.site, "_next/data/").concat(this.buildId, "/en/novel-finder.json")).then(function (r) { return r.json(); })];
                    case 3:
                        json = _a.sent();
                        this.populateTagMap(json);
                        return [2 /*return*/];
                }
            });
        });
    };
    WTRLAB.prototype.fetchTokens = function () {
        return __awaiter(this, void 0, void 0, function () {
            var body, $;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, (0, fetch_1.fetchApi)(this.site + this.sourceLang).then(function (res) {
                            return res.text();
                        })];
                    case 1:
                        body = _c.sent();
                        $ = (0, cheerio_1.load)(body);
                        this.baggage = (_a = $('meta[name="baggage"]').attr('content')) !== null && _a !== void 0 ? _a : '';
                        this.trace = (_b = $('meta[name="sentry-trace"]').attr('content')) !== null && _b !== void 0 ? _b : '';
                        return [2 /*return*/];
                }
            });
        });
    };
    WTRLAB.prototype.parseNovel = function (novelPath) {
        return __awaiter(this, void 0, void 0, function () {
            var body, loadedCheerio, baggage, trace, nextDataElement, nextDataText, rawId, slug, chapterCount, novel, parsedNextData, serieData, genreNames, tagNames, urlMatch, chapterCountText, chapterCountMatch, chapters, error_1, lines, translated;
            var _this = this;
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            return __generator(this, function (_m) {
                switch (_m.label) {
                    case 0: return [4 /*yield*/, (0, fetch_1.fetchApi)(this.site + novelPath).then(function (res) { return res.text(); })];
                    case 1:
                        body = _m.sent();
                        loadedCheerio = (0, cheerio_1.load)(body);
                        baggage = loadedCheerio('meta[name="baggage"]').attr('content');
                        trace = loadedCheerio('meta[name="sentry-trace"]').attr('content');
                        if (!(baggage && trace)) return [3 /*break*/, 2];
                        this.baggage = baggage;
                        this.trace = trace;
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(!this.baggage || !this.trace)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.fetchTokens()];
                    case 3:
                        _m.sent();
                        _m.label = 4;
                    case 4:
                        nextDataElement = loadedCheerio('#__NEXT_DATA__');
                        nextDataText = nextDataElement.html();
                        rawId = null;
                        slug = null;
                        chapterCount = 0;
                        novel = {
                            path: novelPath,
                            name: loadedCheerio('h1.text-uppercase').text(),
                            summary: loadedCheerio('.lead').text().trim(),
                        };
                        parsedNextData = null;
                        if (nextDataText) {
                            try {
                                parsedNextData = JSON.parse(nextDataText);
                            }
                            catch (error) {
                                console.error('Failed to parse __NEXT_DATA__:', error);
                            }
                        }
                        if (this.genreIdMap.size === 0) {
                            this.genreIdMap = new Map(this.filters.genres.options.map(function (o) { return [o.value, o.label]; }));
                        }
                        if (!(this.tagIdMap.size === 0)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.ensureTagMap()];
                    case 5:
                        _m.sent();
                        _m.label = 6;
                    case 6:
                        if (parsedNextData) {
                            serieData = (_c = (_b = (_a = parsedNextData === null || parsedNextData === void 0 ? void 0 : parsedNextData.props) === null || _a === void 0 ? void 0 : _a.pageProps) === null || _b === void 0 ? void 0 : _b.serie) === null || _c === void 0 ? void 0 : _c.serie_data;
                            if (serieData) {
                                novel.name = ((_d = serieData.data) === null || _d === void 0 ? void 0 : _d.title) || '';
                                novel.cover = ((_e = serieData.data) === null || _e === void 0 ? void 0 : _e.image) || '';
                                novel.summary = ((_f = serieData.data) === null || _f === void 0 ? void 0 : _f.description) || '';
                                novel.author = ((_g = serieData.data) === null || _g === void 0 ? void 0 : _g.author) || '';
                                rawId = serieData.raw_id || null;
                                slug = serieData.slug || null;
                                chapterCount = (_h = serieData.chapter_count) !== null && _h !== void 0 ? _h : 0;
                                switch (serieData.status) {
                                    case 0:
                                        novel.status = 'Ongoing';
                                        break;
                                    case 1:
                                        novel.status = 'Completed';
                                        break;
                                    default:
                                        novel.status = 'Unknown';
                                }
                                genreNames = ((_j = serieData.genres) !== null && _j !== void 0 ? _j : [])
                                    .map(function (id) { return _this.genreIdMap.get(String(id)); })
                                    .filter(function (name) { return !!name; });
                                tagNames = ((_k = serieData.tags) !== null && _k !== void 0 ? _k : [])
                                    .map(function (id) { return _this.tagIdMap.get(String(id)); })
                                    .filter(function (name) { return !!name; });
                                if (genreNames.length > 0) {
                                    novel.genres = genreNames.join(', ');
                                }
                                if (tagNames.length > 0) {
                                    novel.tags = tagNames.join(', ');
                                }
                            }
                        }
                        if (!novel.name) {
                            novel.name =
                                loadedCheerio('h1.text-uppercase').text() ||
                                    loadedCheerio('h1.long-title').text() ||
                                    loadedCheerio('.title-wrap h1').text().trim();
                        }
                        if (!novel.cover) {
                            novel.cover =
                                loadedCheerio('.image-wrap img').attr('src') ||
                                    loadedCheerio('.img-wrap > img').attr('src');
                        }
                        if (!novel.summary) {
                            novel.summary =
                                loadedCheerio('.description').text().trim() ||
                                    loadedCheerio('.desc-wrap .description').text().trim() ||
                                    loadedCheerio('.lead').text().trim();
                        }
                        if (!novel.author) {
                            novel.author =
                                loadedCheerio('td:contains("Author")')
                                    .next()
                                    .text()
                                    .replace(/[\t\n]/g, '')
                                    .trim() ||
                                    loadedCheerio('td:contains("Author") + td')
                                        .text()
                                        .replace(/[\t\n]/g, '')
                                        .trim();
                        }
                        if (!novel.status) {
                            novel.status =
                                loadedCheerio('td:contains("Status")')
                                    .next()
                                    .text()
                                    .replace(/[\t\n]/g, '')
                                    .trim() ||
                                    loadedCheerio('td:contains("Status") + td')
                                        .text()
                                        .replace(/[\t\n]/g, '')
                                        .trim() ||
                                    ((_l = loadedCheerio('.detail-line:contains("•")')
                                        .text()
                                        .match(/•\s*(\w+)/)) === null || _l === void 0 ? void 0 : _l[1]) ||
                                    '';
                        }
                        urlMatch = novelPath.match(/serie-(\d+)\/([^/]+)/);
                        if (urlMatch) {
                            rawId = parseInt(urlMatch[1]);
                            slug = urlMatch[2];
                        }
                        if (chapterCount === 0) {
                            chapterCountText = loadedCheerio('.detail-line:contains("Chapters")').text() ||
                                loadedCheerio('div:contains("Chapters")').text();
                            chapterCountMatch = chapterCountText.match(/(\d+)\s+Chapters?/i);
                            if (chapterCountMatch) {
                                chapterCount = parseInt(chapterCountMatch[1]);
                            }
                        }
                        chapters = [];
                        if (!(rawId && slug && chapterCount > 0)) return [3 /*break*/, 11];
                        _m.label = 7;
                    case 7:
                        _m.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, this.fetchAllChapters(rawId, chapterCount, slug)];
                    case 8:
                        chapters = _m.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        error_1 = _m.sent();
                        console.error('Failed to fetch chapters via API:', error_1);
                        chapters = [];
                        return [3 /*break*/, 10];
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        console.warn('Could not extract rawId, slug, or chapterCount from page', {
                            rawId: rawId,
                            slug: slug,
                            chapterCount: chapterCount,
                        });
                        _m.label = 12;
                    case 12:
                        novel.chapters = chapters;
                        if (!novel.summary) return [3 /*break*/, 14];
                        lines = novel.summary.split('\n').filter(function (line) { return line.trim(); });
                        return [4 /*yield*/, this.translate(lines)];
                    case 13:
                        translated = _m.sent();
                        novel.summary = translated
                            .map(function (line) { return (0, cheerio_1.load)(line).text().trim(); })
                            .filter(function (line) { return line; })
                            .join('\n\n');
                        _m.label = 14;
                    case 14: return [2 /*return*/, novel];
                }
            });
        });
    };
    WTRLAB.prototype.decrypt = function (encrypted, encKey) {
        return __awaiter(this, void 0, void 0, function () {
            var isArray, payload, parts, _a, iv, tag, ciphertext, combined, keyBytes, aes, decrypted, plaintext;
            return __generator(this, function (_b) {
                try {
                    isArray = false;
                    payload = encrypted;
                    if (encrypted.startsWith('arr:')) {
                        isArray = true;
                        payload = encrypted.substring(4);
                    }
                    else if (encrypted.startsWith('str:')) {
                        payload = encrypted.substring(4);
                    }
                    parts = payload.split(':');
                    if (parts.length !== 3)
                        throw Error('Invalid encrypted data format');
                    _a = parts.map(function (part) {
                        return Uint8Array.from(atob(part), function (e) { return e.charCodeAt(0); });
                    }), iv = _a[0], tag = _a[1], ciphertext = _a[2];
                    combined = new Uint8Array(ciphertext.length + tag.length);
                    combined.set(ciphertext);
                    combined.set(tag, ciphertext.length);
                    keyBytes = new TextEncoder().encode(encKey.slice(0, 32));
                    aes = (0, aes_1.gcm)(keyBytes, iv);
                    decrypted = aes.decrypt(combined);
                    plaintext = new TextDecoder().decode(decrypted);
                    return [2 /*return*/, isArray ? JSON.parse(plaintext) : plaintext];
                }
                catch (error) {
                    console.error('Client-side decryption error:', error);
                    return [2 /*return*/, { error: "<p>Client-side decryption error:</p>".concat(error) }];
                }
                return [2 /*return*/];
            });
        });
    };
    WTRLAB.prototype.getKey = function ($) {
        return __awaiter(this, void 0, void 0, function () {
            var searchKey, URLs, results, encKey;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        searchKey = 'TextEncoder().encode("';
                        URLs = __spreadArray([], new Set($('head script')
                            .toArray()
                            .map(function (el) { return $(el).attr('src'); })
                            .filter(function (src) { return !!src; })), true);
                        return [4 /*yield*/, Promise.all(URLs.map(function (src) { return __awaiter(_this, void 0, void 0, function () {
                                var raw, index;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, (0, fetch_1.fetchApi)("".concat(this.site).concat(src)).then(function (r) { return r.text(); })];
                                        case 1:
                                            raw = _a.sent();
                                            index = raw.indexOf(searchKey);
                                            return [2 /*return*/, index >= 0 ? raw.substring(index + 22, index + 54) : null];
                                    }
                                });
                            }); }))];
                    case 1:
                        results = _a.sent();
                        encKey = results.find(function (k) { return k !== null; });
                        if (!encKey)
                            encKey = 'IJAFUUxjM25hyzL2AZrn0wl7cESED6Ru';
                        return [2 /*return*/, encKey];
                }
            });
        });
    };
    WTRLAB.prototype.translate = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, translated, out;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetch_1.fetchApi)('https://translate-pa.googleapis.com/v1/translateHtml', {
                            'credentials': 'omit',
                            'headers': {
                                'content-type': 'application/json+protobuf',
                                'X-Goog-API-Key': 'AIzaSyATBXajvzQLTDHEQbcpq0Ihe0vWDHmO520',
                            },
                            'referrer': 'https://wtr-lab.com/',
                            'body': "[[".concat(JSON.stringify(data), ",\"auto\",\"id\"],\"te_lib\"]"),
                            'method': 'POST',
                        })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        translated = _a.sent();
                        out = translated && translated[0] ? translated[0] : [];
                        return [2 /*return*/, out];
                }
            });
        });
    };
    WTRLAB.prototype.parseChapter = function (chapterPath) {
        return __awaiter(this, void 0, void 0, function () {
            var url, rawId, chapterNo, loadedCheerio, urlMatch, body, chapterJson, jsonData, errorMsg, translationTypes, eLog, parsedJson, _i, translationTypes_1, type, apiResponse, errorMsg, chapterContent, chapterGlossary, htmlString, body, encKey, dictionary, _a, chapterContent_1, text;
            var _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        url = this.site + chapterPath;
                        rawId = null;
                        chapterNo = null;
                        loadedCheerio = null;
                        urlMatch = chapterPath.match(/serie-(\d+)\/[^/]+\/chapter-(\d+)/);
                        if (urlMatch) {
                            rawId = parseInt(urlMatch[1], 10);
                            chapterNo = parseInt(urlMatch[2], 10);
                        }
                        if (!(!rawId || !chapterNo)) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(url).then(function (res) { return res.text(); })];
                    case 1:
                        body = _e.sent();
                        loadedCheerio = (0, cheerio_1.load)(body);
                        chapterJson = loadedCheerio('#__NEXT_DATA__').html() + '';
                        jsonData = JSON.parse(chapterJson);
                        rawId = jsonData.props.pageProps.serie.chapter.raw_id;
                        chapterNo = jsonData.props.pageProps.serie.chapter.order;
                        _e.label = 2;
                    case 2:
                        if (!rawId || !chapterNo) {
                            errorMsg = "Missing required parameters for API call from URL '".concat(chapterPath, "' - rawId: ").concat(rawId, ", chapterNo: ").concat(chapterNo, ". Please check the URL format.");
                            console.error(errorMsg);
                            throw new Error(errorMsg);
                        }
                        translationTypes = ['webplus'];
                        eLog = '';
                        _i = 0, translationTypes_1 = translationTypes;
                        _e.label = 3;
                    case 3:
                        if (!(_i < translationTypes_1.length)) return [3 /*break*/, 7];
                        type = translationTypes_1[_i];
                        return [4 /*yield*/, (0, fetch_1.fetchApi)("".concat(this.site, "api/reader/get"), {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                },
                                referrer: url,
                                body: JSON.stringify({
                                    translate: type,
                                    language: this.sourceLang.replace('/', ''),
                                    raw_id: rawId,
                                    chapter_no: chapterNo,
                                    retry: false,
                                    force_retry: false,
                                }),
                            })];
                    case 4:
                        apiResponse = _e.sent();
                        return [4 /*yield*/, apiResponse.json()];
                    case 5:
                        parsedJson = _e.sent();
                        if (!apiResponse.ok) {
                            if (parsedJson.error) {
                                eLog = parsedJson.error;
                                return [3 /*break*/, 6];
                            }
                        }
                        else if (!parsedJson.error) {
                            return [3 /*break*/, 7];
                        }
                        _e.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 3];
                    case 7:
                        if (parsedJson.success == false) {
                            errorMsg = parsedJson.message;
                            console.error(errorMsg);
                            throw new Error(errorMsg);
                        }
                        chapterContent = parsedJson.data.data.body;
                        chapterGlossary = (_c = (_b = parsedJson === null || parsedJson === void 0 ? void 0 : parsedJson.data) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.glossary_data;
                        htmlString = '';
                        if (!(chapterContent.toString().startsWith('arr:') ||
                            chapterContent.toString().startsWith('str:'))) return [3 /*break*/, 13];
                        if (!!loadedCheerio) return [3 /*break*/, 9];
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(url).then(function (res) { return res.text(); })];
                    case 8:
                        body = _e.sent();
                        loadedCheerio = (0, cheerio_1.load)(body);
                        _e.label = 9;
                    case 9: return [4 /*yield*/, this.getKey(loadedCheerio)];
                    case 10:
                        encKey = _e.sent();
                        return [4 /*yield*/, this.decrypt(chapterContent, encKey)];
                    case 11:
                        chapterContent = _e.sent();
                        if (Object.prototype.hasOwnProperty.call(chapterContent, 'error')) {
                            htmlString += "<p>".concat(chapterContent.error.toString(), "</p>");
                            return [2 /*return*/, htmlString];
                        }
                        return [4 /*yield*/, this.translate(chapterContent)];
                    case 12:
                        chapterContent = _e.sent();
                        _e.label = 13;
                    case 13:
                        if (eLog !== '') {
                            htmlString += "<p style=\"color:darkred;\">".concat(eLog, "</p>");
                        }
                        dictionary = ((_d = chapterGlossary === null || chapterGlossary === void 0 ? void 0 : chapterGlossary.terms) === null || _d === void 0 ? void 0 : _d.map(function (t) { return t[0]; })) || [];
                        for (_a = 0, chapterContent_1 = chapterContent; _a < chapterContent_1.length; _a++) {
                            text = chapterContent_1[_a];
                            if (dictionary.length > 0) {
                                text = text.replaceAll(/(?:wtr-lab\s+)?※([0-9]+)[⛬〓]/g, function (m, index) { return dictionary[parseInt(index)] || m; });
                            }
                            htmlString += "<p>".concat(text, "</p>");
                        }
                        return [2 /*return*/, htmlString];
                }
            });
        });
    };
    WTRLAB.prototype.fetchAllChapters = function (rawId, totalChapters, slug) {
        return __awaiter(this, void 0, void 0, function () {
            var batchSize, batches, start, results;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        batchSize = 250;
                        batches = [];
                        for (start = 1; start <= totalChapters; start += batchSize) {
                            batches.push({
                                start: start,
                                end: Math.min(start + batchSize - 1, totalChapters),
                            });
                        }
                        return [4 /*yield*/, Promise.all(batches.map(function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
                                var response, data, chapters, error_2;
                                var _this = this;
                                var _c, _d, _e;
                                var start = _b.start, end = _b.end;
                                return __generator(this, function (_f) {
                                    switch (_f.label) {
                                        case 0:
                                            _f.trys.push([0, 3, , 4]);
                                            return [4 /*yield*/, (0, fetch_1.fetchApi)("".concat(this.site, "api/chapters/").concat(rawId, "?start=").concat(start, "&end=").concat(end), { headers: __assign({}, this.headers) })];
                                        case 1:
                                            response = _f.sent();
                                            return [4 /*yield*/, response.json()];
                                        case 2:
                                            data = _f.sent();
                                            chapters = (_e = (_c = data.chapters) !== null && _c !== void 0 ? _c : (_d = data.data) === null || _d === void 0 ? void 0 : _d.chapters) !== null && _e !== void 0 ? _e : [];
                                            if (!Array.isArray(chapters))
                                                return [2 /*return*/, []];
                                            return [2 /*return*/, chapters.map(function (apiChapter) {
                                                    var _a;
                                                    return ({
                                                        name: apiChapter.title,
                                                        path: "".concat(_this.sourceLang, "serie-").concat(rawId, "/").concat(slug, "/chapter-").concat(apiChapter.order),
                                                        releaseTime: (_a = apiChapter.updated_at) === null || _a === void 0 ? void 0 : _a.substring(0, 10),
                                                        chapterNumber: apiChapter.order,
                                                    });
                                                })];
                                        case 3:
                                            error_2 = _f.sent();
                                            console.error("Failed to fetch chapters ".concat(start, "-").concat(end, ":"), error_2);
                                            return [2 /*return*/, []];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results
                                .flat()
                                .sort(function (a, b) { return (a.chapterNumber || 0) - (b.chapterNumber || 0); })];
                }
            });
        });
    };
    WTRLAB.prototype.searchNovels = function (searchTerm, page) {
        return __awaiter(this, void 0, void 0, function () {
            var filters;
            return __generator(this, function (_a) {
                filters = __assign(__assign({}, this.filters), { search: __assign(__assign({}, this.filters.search), { value: searchTerm }) });
                return [2 /*return*/, this.popularNovels(page, { showLatestNovels: false, filters: filters })];
            });
        });
    };
    return WTRLAB;
}());
exports.default = new WTRLAB();
