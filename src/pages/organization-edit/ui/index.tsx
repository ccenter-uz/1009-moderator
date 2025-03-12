import { Button, Divider, Flex, Form, notification, Steps } from "antd";
import i18next from "i18next";
import {
  CSSProperties,
  Dispatch,
  FC,
  lazy,
  SetStateAction,
  Suspense,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

import { setCategoryData } from "@widgets/org-edit-first-step";
import {
  setEditAllDay,
  setEditAllType,
  setEditNoDayoffs,
  setEditWithoutLunch,
  setImages,
} from "@widgets/org-edit-fourth-step";
import { setOrientirData } from "@widgets/org-edit-second-step";
import { setPhoneData } from "@widgets/org-edit-third-step";

import {
  useLazyGetOneOrganizationQuery,
  useUpdateOrganizationMutation,
} from "@entities/organization";

import {
  ERROR_STEPS,
  getDayOffsCheckbox,
  getEditingStepStorageValues,
  getLocalStorage,
  handleEditLocalDatas,
  handleResetCurrentEditingToInitial,
  notificationResponse,
  omitUndefinedValues,
  removeLocalStorage,
  SEND_BODY,
  setDatyOffsCheckbox,
  setLocalStorage,
  setSessionStorage,
  STEPS_DATA,
  STEPS_EDIT_KEYS,
  STEPS_ENUM,
} from "@shared/lib/helpers";
import { IOrganizationBody, RootState } from "@shared/types";
import { LoadingSpinner } from "@shared/ui";

// STYLE
const contentStyle: CSSProperties = {
  margin: "16px",
};

// LAZY LOAD
const OrgEditFirstStepUI = lazy(() =>
  import("@widgets/org-edit-first-step").then((module) => ({
    default: module.OrgEditFirstStepUI,
  })),
);
const OrgEditSecondStepUI = lazy(() =>
  import("@widgets/org-edit-second-step").then((module) => ({
    default: module.OrgEditSecondStepUI,
  })),
);
const OrgEditThirdStepUI = lazy(() =>
  import("@widgets/org-edit-third-step").then((module) => ({
    default: module.OrgEditThirdStepUI,
  })),
);
const OrgEditFourthStepUI = lazy(() =>
  import("@widgets/org-edit-fourth-step").then((module) => ({
    default: module.OrgEditFourthStepUI,
  })),
);

export const OrgEditPage: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<string>();
  const { setEditId } = useOutletContext<{
    setEditId: Dispatch<SetStateAction<string | number | null>>;
  }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [triggerOneOrg, { isLoading: isLoadingOneOrg }] =
    useLazyGetOneOrganizationQuery();
  const [firstErrorStep, setFirstErrorStep] = useState<number | null>(
    getLocalStorage(ERROR_STEPS.FIRST) ?? null,
  );
  const [secondErrorStep, setSecondErrorStep] = useState<number | null>(
    getLocalStorage(ERROR_STEPS.SECOND) ?? null,
  );
  const [thirdErrorStep, setThirdErrorStep] = useState<number | null>(
    getLocalStorage(ERROR_STEPS.THIRD) ?? null,
  );
  const [fourErrorStep, setFourErrorStep] = useState<number | null>(
    getLocalStorage(ERROR_STEPS.FOURTH) ?? null,
  );
  const [updateOrganization, { isLoading }] = useUpdateOrganizationMutation();
  const [form] = Form.useForm();
  const { data: categoryTu } = useSelector(
    ({ useEditOrgFirstStepSlice }: RootState) => useEditOrgFirstStepSlice,
  );
  const { data: orientirData } = useSelector(
    ({ useEditOrgSecondStepSlice }: RootState) => useEditOrgSecondStepSlice,
  );
  const { data: phoneData } = useSelector(
    ({ useEditOrgThirdStepSlice }: RootState) => useEditOrgThirdStepSlice,
  );
  const { data: images, pictures } = useSelector(
    ({ useEditOrgFourthStepSlice }: RootState) => useEditOrgFourthStepSlice,
  );
  const [current, setCurrent] = useState(
    Number(localStorage.getItem(STEPS_EDIT_KEYS.CURRENT)) || 0,
  );

  // STEPS
  const items = [
    {
      title: i18next.t("personal"),
      description: i18next.t("personal_description"),
      status:
        firstErrorStep == STEPS_ENUM.firstStep ? ("error" as const) : undefined,
    },
    {
      title: i18next.t("address"),
      description: i18next.t("address_description"),
      status: secondErrorStep ? ("error" as const) : undefined,
    },
    {
      title: i18next.t("contacts"),
      description: i18next.t("contacts_description"),
      status: thirdErrorStep ? ("error" as const) : undefined,
    },
    {
      title: i18next.t("additional"),
      description: i18next.t("additional_description"),
      status: fourErrorStep ? ("error" as const) : undefined,
    },
  ];

  const initializeFormValues = () => {
    const { firstStepData, secondStepData, thirdStepData, fourthStepData } =
      getEditingStepStorageValues();

    if (firstStepData) {
      form.setFieldsValue(firstStepData);
      dispatch(setCategoryData(firstStepData.categoryTu));
    }
    if (secondStepData) {
      form.setFieldsValue(secondStepData);
      dispatch(setOrientirData(secondStepData.nearbees));
    }
    if (thirdStepData) {
      form.setFieldsValue(thirdStepData);
      dispatch(setPhoneData(thirdStepData.phone));
    }
    if (fourthStepData) {
      const dayOffs = setDatyOffsCheckbox(form, fourthStepData.dayoffs);
      form.setFieldsValue({
        ...fourthStepData,
        dayOffs,
      });
      dispatch(setImages(fourthStepData.images));
      dispatch(setEditAllDay(fourthStepData.allDay));
      dispatch(setEditAllType(fourthStepData.allType));
      dispatch(setEditNoDayoffs(fourthStepData.noDayoffs));
      dispatch(setEditWithoutLunch(fourthStepData.withoutLunch));
    }
  };

  const STORE_STEPS_DATA = (current: number) => {
    // STORE STEPS DATA
    if (current === STEPS_ENUM.firstStep) {
      const firstStepData = {
        ...form.getFieldsValue(STEPS_DATA.FIRST_FORMDATA),
        categoryTu,
      };
      localStorage.setItem(
        STEPS_EDIT_KEYS.FIRST,
        JSON.stringify(firstStepData),
      );
      localStorage.setItem(STEPS_EDIT_KEYS.EDIT_ID, JSON.stringify(id));
    } else if (current === STEPS_ENUM.secondStep) {
      const secondStepData = {
        ...form.getFieldsValue(STEPS_DATA.SECOND_FORMDATA),
        nearbees: orientirData,
      };
      localStorage.setItem(
        STEPS_EDIT_KEYS.SECOND,
        JSON.stringify(secondStepData),
      );
    } else if (current === STEPS_ENUM.thirdStep) {
      const thirdStepData = {
        ...form.getFieldsValue(STEPS_DATA.THIRD_FORMDATA),
        phone: phoneData,
      };
      localStorage.setItem(
        STEPS_EDIT_KEYS.THIRD,
        JSON.stringify(thirdStepData),
      );
    }
  };

  const handleErrorStep = (isNull: boolean) => {
    switch (current) {
      case STEPS_ENUM.firstStep:
        return (
          setFirstErrorStep(isNull ? null : current),
          setLocalStorage(ERROR_STEPS.FIRST, isNull ? null : current)
        );
      case STEPS_ENUM.secondStep:
        return (
          setSecondErrorStep(isNull ? null : current),
          setLocalStorage(ERROR_STEPS.SECOND, isNull ? null : current)
        );
      case STEPS_ENUM.thirdStep:
        return (
          setThirdErrorStep(isNull ? null : current),
          setLocalStorage(ERROR_STEPS.THIRD, isNull ? null : current)
        );
      case STEPS_ENUM.fourthStep:
        return (
          setFourErrorStep(isNull ? null : current),
          setLocalStorage(ERROR_STEPS.FOURTH, isNull ? null : current)
        );
    }
  };

  const handleStepChange = async (step: number, isNext: boolean) => {
    try {
      await form.validateFields();
      handleErrorStep(true);
    } catch (e) {
      handleErrorStep(false);
    } finally {
      setCurrent(isNext ? step + 1 : step);
      localStorage.setItem(
        STEPS_EDIT_KEYS.CURRENT,
        JSON.stringify(isNext ? step + 1 : step),
      );
      STORE_STEPS_DATA(step);
    }
  };
  const next = async () => {
    handleStepChange(current, true);
  };
  const prev = () => {
    setCurrent(current - 1);
    localStorage.setItem(STEPS_EDIT_KEYS.CURRENT, JSON.stringify(current - 1));
  };

  const extractPictures = (pictures: unknown[], images: { link: string }[]) => {
    if (pictures.length !== 0) {
      return pictures;
    }

    return images.filter((item) => !!item.link).map((item) => item);
  };

  const onSubmit = async () => {
    if (
      firstErrorStep !== null ||
      secondErrorStep !== null ||
      thirdErrorStep !== null ||
      fourErrorStep !== null
    ) {
      return notificationResponse(
        null,
        t("you_have_not_filled_the_required_fields"),
      );
    } else {
      const formData = new FormData();

      const body: IOrganizationBody = {
        ...omitUndefinedValues(form.getFieldsValue(SEND_BODY)),
        id: id as string,
        paymentTypes: {
          cash: form.getFieldValue("cash"),
          terminal: form.getFieldValue("terminal"),
          transfer: form.getFieldValue("transfer"),
          allType: form.getFieldValue("allType"),
        },
        workTime: {
          dayoffs: getDayOffsCheckbox(form),
          worktimeFrom: form.getFieldValue("worktimeFrom"),
          worktimeTo: form.getFieldValue("worktimeTo"),
          workTimeDescription: form.getFieldValue("workTimeDescription"),
          allDayDescription: form.getFieldValue("allDayDescription"),
          allDay: form.getFieldValue("allDay"),
          noDayoffs: form.getFieldValue("noDayoffs"),
          withoutLunch: form.getFieldValue("withoutLunch"),
          lunchFrom: form.getFieldValue("lunchFrom"),
          lunchTo: form.getFieldValue("lunchTo"),
        },
        transport: {
          bus: form.getFieldValue("bus"),
          microBus: form.getFieldValue("microBus"),
          metroStation: form.getFieldValue("metroStation"),
        },
        productService: { productServices: categoryTu },
        nearby: {
          nearbees: orientirData,
        },
        phone: {
          phones: phoneData.map(
            (item: {
              phone: string;
              phoneTypeId: number;
              id: string;
              isSecret: boolean;
            }) => ({
              key: item.id,
              phone: item.phone,
              phoneTypeId: item.phoneTypeId,
              isSecret: item.isSecret,
            }),
          ),
        },
        picture: {
          pictures: extractPictures(pictures, images),
        },
      };
      for (const key in body) {
        formData.append(key, JSON.stringify(body[key]));
      }

      images.forEach((image: { link: string; file?: Blob }) => {
        if (!image.link && image.file) {
          formData.append("photos", image.file);
        }
      });

      const response = await updateOrganization(formData);

      notificationResponse(response);

      response?.data.status === 200 &&
        (onClearAllData({ fromSubmit: true }),
        setSessionStorage("fromEdit", true),
        navigate("/orgs/all"),
        setEditId(null));
    }
  };
  const onValuesChange = (
    _: {
      [name: string]: boolean;
    },
    allValues: {
      allDay: boolean;
      allType: boolean;
      noDayoffs: boolean;
      withoutLunch: boolean;
    },
  ) => {
    const { allDay, allType, noDayoffs, withoutLunch } = allValues;
    dispatch(setEditAllDay(allDay));
    dispatch(setEditAllType(allType));
    dispatch(setEditNoDayoffs(noDayoffs));
    dispatch(setEditWithoutLunch(withoutLunch));

    if (withoutLunch) {
      form.resetFields(["lunchFrom", "lunchTo"]);
    }

    if (allType) {
      form.setFieldsValue({ cash: true, terminal: true, transfer: true });
    }
    if (noDayoffs) {
      form.resetFields([
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ]);
    }
  };

  const onClearAllData = ({ fromSubmit = false }: { fromSubmit?: boolean }) => {
    removeLocalStorage(STEPS_EDIT_KEYS.FIRST);
    removeLocalStorage(STEPS_EDIT_KEYS.SECOND);
    removeLocalStorage(STEPS_EDIT_KEYS.THIRD);
    removeLocalStorage(STEPS_EDIT_KEYS.FOURTH);
    removeLocalStorage(STEPS_EDIT_KEYS.CURRENT);
    removeLocalStorage(STEPS_EDIT_KEYS.EDIT_ID);
    clearErrorSteps({ clearAllWithState: true });
    form.resetFields();
    dispatch(setCategoryData([]));
    dispatch(setOrientirData([]));
    dispatch(setPhoneData([]));
    dispatch(setImages([]));
    dispatch(setEditAllDay(false));
    dispatch(setEditAllType(false));
    dispatch(setEditNoDayoffs(false));
    dispatch(setEditWithoutLunch(false));
    !fromSubmit &&
      notification.success({
        message: t("erased"),
        placement: "bottomRight",
        duration: 1,
      });
    setCurrent(0);
  };

  const clearErrorSteps = ({
    clearAllWithState = false,
    currentStep,
  }: {
    clearAllWithState?: boolean;
    currentStep?: number;
  }) => {
    if (currentStep === 0) {
      setFirstErrorStep(null);
      removeLocalStorage(ERROR_STEPS.FIRST);
    } else if (currentStep === 1) {
      setSecondErrorStep(null);
      removeLocalStorage(ERROR_STEPS.SECOND);
    } else if (currentStep === 2) {
      setThirdErrorStep(null);
      removeLocalStorage(ERROR_STEPS.THIRD);
    } else if (currentStep === 3) {
      setFourErrorStep(null);
      removeLocalStorage(ERROR_STEPS.FOURTH);
    }

    if (clearAllWithState) {
      setFirstErrorStep(null);
      setSecondErrorStep(null);
      setThirdErrorStep(null);
      setFourErrorStep(null);
      removeLocalStorage(ERROR_STEPS.FIRST);
      removeLocalStorage(ERROR_STEPS.SECOND);
      removeLocalStorage(ERROR_STEPS.THIRD);
      removeLocalStorage(ERROR_STEPS.FOURTH);
    } else {
      removeLocalStorage(ERROR_STEPS.FIRST);
      removeLocalStorage(ERROR_STEPS.SECOND);
      removeLocalStorage(ERROR_STEPS.THIRD);
      removeLocalStorage(ERROR_STEPS.FOURTH);
    }
  };

  const onResetInitial = () => {
    triggerOneOrg(id).then((res) => {
      if (res.isSuccess) {
        handleEditLocalDatas(res.data?.data[0]);
        initializeFormValues();
        notification.success({
          placement: "bottomRight",
          message: t("erased"),
        });
      }
    });
  };

  const onResetCurrentStep = () => {
    triggerOneOrg(id).then((res) => {
      if (res.isSuccess) {
        handleResetCurrentEditingToInitial(current, res.data?.data[0]);
        initializeFormValues();
        notification.success({
          placement: "bottomRight",
          message: t("erased"),
        });
        clearErrorSteps({ currentStep: current });
      }
    });
  };

  useEffect(() => {
    initializeFormValues();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Steps
        current={current}
        items={items}
        onChange={(step) => handleStepChange(step, false)}
      />
      <Divider />
      <div className="step-content" style={contentStyle}>
        <Form
          onFinish={onSubmit}
          onValuesChange={onValuesChange}
          id="edit-org-form"
          form={form}
        >
          <Suspense fallback={<LoadingSpinner />}>
            {current === STEPS_ENUM.firstStep && (
              <OrgEditFirstStepUI form={form} />
            )}
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            {current === STEPS_ENUM.secondStep && <OrgEditSecondStepUI />}
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            {current === STEPS_ENUM.thirdStep && <OrgEditThirdStepUI />}
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            {current === STEPS_ENUM.fourthStep && <OrgEditFourthStepUI />}
          </Suspense>
        </Form>
      </div>
      <Divider />
      <Flex align="center" justify="end" gap={8} style={{ marginTop: 24 }}>
        <Button
          danger
          disabled={isLoading}
          loading={isLoadingOneOrg}
          onClick={onResetInitial}
        >
          {t("reset-to-initial")}
        </Button>
        <Button
          disabled={isLoading}
          loading={isLoadingOneOrg}
          onClick={onResetCurrentStep}
        >
          {t("reset-current-to-initial")}
        </Button>
        {current > 0 && (
          <Button
            disabled={isLoading}
            style={{ margin: "0 8px" }}
            onClick={() => prev()}
          >
            {t("previous")}
          </Button>
        )}
        {current < items.length - 1 && (
          <Button disabled={isLoading} type="primary" onClick={() => next()}>
            {t("next")}
          </Button>
        )}
        {current === items.length - 1 && (
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            form="edit-org-form"
          >
            {t("save")}
          </Button>
        )}
      </Flex>
    </>
  );
};
