/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Lecture {
  /** ID */
  id?: number;
  /** Owner */
  owner?: string;
  /** Moderator */
  moderator?: string;
  /** Specialists */
  specialists?: string;
  /** Статус */
  status?: 1 | 2 | 3 | 4 | 5;
  /**
   * Дата создания
   * @format date-time
   */
  date_created?: string | null;
  /**
   * Дата формирования
   * @format date-time
   */
  date_formation?: string | null;
  /**
   * Дата завершения
   * @format date-time
   */
  date_complete?: string | null;
  /** Date */
  date?: string | null;
  /**
   * Room
   * @min -2147483648
   * @max 2147483647
   */
  room?: number | null;
}

export interface SpecialistLecture {
  /** ID */
  id?: number;
  /**
   * Comment
   * @min -2147483648
   * @max 2147483647
   */
  comment?: number;
  /** Specialist */
  specialist?: number | null;
  /** Lecture */
  lecture?: number | null;
}

export interface UpdateLectureStatusAdmin {
  /** Status */
  status: number;
}

export interface SpecialistAdd {
  /**
   * Название
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Описание
   * @minLength 1
   * @maxLength 500
   */
  description: string;
  /**
   * Цена
   * @min -2147483648
   * @max 2147483647
   */
  price: number;
  /**
   * Фото
   * @format uri
   */
  image?: string | null;
}

export interface Specialist {
  /** ID */
  id?: number;
  /** Image */
  image?: string;
  /**
   * Название
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Описание
   * @minLength 1
   * @maxLength 500
   */
  description: string;
  /** Статус */
  status?: 1 | 2;
  /**
   * Цена
   * @min -2147483648
   * @max 2147483647
   */
  price: number;
}

export interface UserLogin {
  /**
   * Username
   * @minLength 1
   */
  username: string;
  /**
   * Password
   * @minLength 1
   */
  password: string;
}

export interface UserRegister {
  /** ID */
  id?: number;
  /**
   * Адрес электронной почты
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Пароль
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  /**
   * Имя пользователя
   * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
}

export interface UserProfile {
  /**
   * Username
   * @minLength 1
   */
  username?: string;
  /**
   * Email
   * @minLength 1
   */
  email?: string;
  /**
   * Password
   * @minLength 1
   */
  password?: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8000/api" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://localhost:8000/api
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  lectures = {
    /**
     * No description
     *
     * @tags lectures
     * @name LecturesList
     * @request GET:/lectures/
     * @secure
     */
    lecturesList: (
      query?: {
        status?: number;
        date_formation_start?: string;
        date_formation_end?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/lectures/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags lectures
     * @name LecturesRead
     * @request GET:/lectures/{lecture_id}/
     * @secure
     */
    lecturesRead: (lectureId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/lectures/${lectureId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags lectures
     * @name LecturesDeleteDelete
     * @request DELETE:/lectures/{lecture_id}/delete/
     * @secure
     */
    lecturesDeleteDelete: (lectureId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/lectures/${lectureId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags lectures
     * @name LecturesDeleteSpecialistDelete
     * @request DELETE:/lectures/{lecture_id}/delete_specialist/{specialist_id}/
     * @secure
     */
    lecturesDeleteSpecialistDelete: (lectureId: string, specialistId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/lectures/${lectureId}/delete_specialist/${specialistId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags lectures
     * @name LecturesUpdateUpdate
     * @request PUT:/lectures/{lecture_id}/update/
     * @secure
     */
    lecturesUpdateUpdate: (lectureId: string, data: Lecture, params: RequestParams = {}) =>
      this.request<Lecture, any>({
        path: `/lectures/${lectureId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags lectures
     * @name LecturesUpdateSpecialistUpdate
     * @request PUT:/lectures/{lecture_id}/update_specialist/{specialist_id}/
     * @secure
     */
    lecturesUpdateSpecialistUpdate: (
      lectureId: string,
      specialistId: string,
      data: SpecialistLecture,
      params: RequestParams = {},
    ) =>
      this.request<SpecialistLecture, any>({
        path: `/lectures/${lectureId}/update_specialist/${specialistId}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags lectures
     * @name LecturesUpdateStatusAdminUpdate
     * @request PUT:/lectures/{lecture_id}/update_status_admin/
     * @secure
     */
    lecturesUpdateStatusAdminUpdate: (
      lectureId: string,
      data: UpdateLectureStatusAdmin,
      params: RequestParams = {},
    ) =>
      this.request<UpdateLectureStatusAdmin, any>({
        path: `/lectures/${lectureId}/update_status_admin/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags lectures
     * @name LecturesUpdateStatusUserUpdate
     * @request PUT:/lectures/{lecture_id}/update_status_user/
     * @secure
     */
    lecturesUpdateStatusUserUpdate: (lectureId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/lectures/${lectureId}/update_status_user/`,
        method: "PUT",
        secure: true,
        ...params,
      }),
  };
  specialists = {
    /**
     * No description
     *
     * @tags specialists
     * @name SpecialistsList
     * @request GET:/specialists/
     * @secure
     */
    specialistsList: (
      query?: {
        specialist_name?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/specialists/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags specialists
     * @name SpecialistsCreateCreate
     * @request POST:/specialists/create/
     * @secure
     */
    specialistsCreateCreate: (
      data: {
        /**
         * @minLength 1
         * @maxLength 100
         */
        name: string;
        /**
         * @minLength 1
         * @maxLength 500
         */
        description: string;
        /**
         * @min -2147483648
         * @max 2147483647
         */
        price: number;
        /** @format binary */
        image?: File | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<SpecialistAdd, any>({
        path: `/specialists/create/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags specialists
     * @name SpecialistsRead
     * @request GET:/specialists/{specialist_id}/
     * @secure
     */
    specialistsRead: (specialistId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/specialists/${specialistId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags specialists
     * @name SpecialistsAddToLectureCreate
     * @request POST:/specialists/{specialist_id}/add_to_lecture/
     * @secure
     */
    specialistsAddToLectureCreate: (specialistId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/specialists/${specialistId}/add_to_lecture/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags specialists
     * @name SpecialistsDeleteDelete
     * @request DELETE:/specialists/{specialist_id}/delete/
     * @secure
     */
    specialistsDeleteDelete: (specialistId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/specialists/${specialistId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags specialists
     * @name SpecialistsUpdateUpdate
     * @request PUT:/specialists/{specialist_id}/update/
     * @secure
     */
    specialistsUpdateUpdate: (specialistId: string, data: Specialist, params: RequestParams = {}) =>
      this.request<Specialist, any>({
        path: `/specialists/${specialistId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags specialists
     * @name SpecialistsUpdateImageCreate
     * @request POST:/specialists/{specialist_id}/update_image/
     * @secure
     */
    specialistsUpdateImageCreate: (
      specialistId: string,
      data: {
        /** @format binary */
        image?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/specialists/${specialistId}/update_image/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users
     * @name UsersLoginCreate
     * @request POST:/users/login/
     * @secure
     */
    usersLoginCreate: (data: UserLogin, params: RequestParams = {}) =>
      this.request<UserLogin, any>({
        path: `/users/login/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersLogoutCreate
     * @request POST:/users/logout/
     * @secure
     */
    usersLogoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/logout/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersRegisterCreate
     * @request POST:/users/register/
     * @secure
     */
    usersRegisterCreate: (data: UserRegister, params: RequestParams = {}) =>
      this.request<UserRegister, any>({
        path: `/users/register/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersUpdateUpdate
     * @request PUT:/users/{user_id}/update/
     * @secure
     */
    usersUpdateUpdate: (userId: string, data: UserProfile, params: RequestParams = {}) =>
      this.request<UserProfile, any>({
        path: `/users/${userId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
