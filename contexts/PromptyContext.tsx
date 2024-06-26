import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { LoginUser } from "@/models/types/loginUser.type";
import { useRouter } from "next/router";
import { apiGetGeneratedMessageCount } from "@/services/api/MessageAPI";
import { apiGetTones } from "@/services/api/ToneAPI";
// import { apiGetAllConfigs } from "@/services/api/ConfigAPI";
import { Feature, Language } from "@/models/types/config.types";
import { Tones } from "@/models/types/tone.type";
import { UseUser } from "./_User";
import { useTranslation } from "next-i18next";
interface PromptyContextInterface {
  user: LoginUser | null;
  // languages: Language[];
  // currentLanguage: Language;
  tones: Tones[];
  // features: Feature[];
  generatedMessageCount: number;
  changeLanguage: (locale: string) => void;
  updateGeneratedMessageCount: () => Promise<void>;
  handleLogin: (typeLogin: string) => Promise<void>;
  handleLogout: () => Promise<void>;
  getUserData: () => Promise<void>;
}

const PromptyContext = createContext<PromptyContextInterface>({
  user: {} as LoginUser,
  // languages: [],
  // currentLanguage: {} as Language,
  tones: [],
  // features: [],
  generatedMessageCount: 0,
  changeLanguage: () => {},
  updateGeneratedMessageCount: async () => {},
  handleLogin: async () => {},
  handleLogout: async () => {},
  getUserData: async () => {},
});

interface Props {
  children: ReactNode;
}

export function usePromptyContext() {
  return useContext(PromptyContext);
}

export function PromptyContextProvider({ children }: Props) {
  const [languages, setLanguages] = useState<Language[]>([]);
  const { i18n } = useTranslation();
  const [allTones, setAllTones] = useState<Tones[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<Language>();
  const [tones, setTones] = useState<Tones[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [messageCount, setMessageCount] = useState<number>(0);
  const router = useRouter();
  const { user, handleLogin, handleLogout, getUserData } = UseUser();
  const changeLanguage = (locale: string) => {
    // setCurrentLanguage(
    //   languages.find((language) => language.languageName === locale),
    // );
    router.push(router.pathname, router.asPath, { locale });
  };

  const getTonesByLanguage = () => {
    // const language = languages.find(
    //   (language) => language.languageName === currentLanguage?.languageName,
    // );
    // const tonesByLanguage = allTones.filter(
    //   (tone) => tone.languageId === language?.id,
    // );
    // setTones(tonesByLanguage);
  };

  const updateGeneratedMessageCount = async () => {
    const messageCount = await apiGetGeneratedMessageCount();
    setMessageCount(messageCount ? messageCount : 0);
  };

  const fetchTonesByLanguage = async () => {
    try {
      const response = await apiGetTones(i18n.language);
      setTones(response);
      // console.log(response)
      // console.log(tones)
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      // const response = await apiGetTones(i18n.language);
      // console.log(response)
      // const response = await apiGetAllConfigs();
      // setLanguages(response.data?.languages!);
      // setAllTones(response.data?.tones!);
      // setFeatures(response.data?.features!);

      // const localLanguage = response.data?.languages.find(
      //   (language) => language.languageName === router.locale,
      // );
      // setCurrentLanguage(localLanguage ? localLanguage : response.data?.languages[0]);

      await fetchTonesByLanguage();
      const messageCount = await apiGetGeneratedMessageCount();
      setMessageCount(messageCount ? messageCount : 0);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchTonesByLanguage();
  }, [i18n.language]);

  const value: PromptyContextInterface = {
    user: user,
    // languages: languages,
    // currentLanguage: currentLanguage!,
    tones: tones,
    // features: features,
    generatedMessageCount: messageCount,
    changeLanguage: changeLanguage,
    updateGeneratedMessageCount: updateGeneratedMessageCount,
    handleLogin: handleLogin,
    handleLogout: handleLogout,
    getUserData: getUserData,
  };
  return (
    <PromptyContext.Provider value={value}>{children}</PromptyContext.Provider>
  );
}
