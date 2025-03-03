import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../Searchbar/SearchBar';
import './Home.css';
import USER_SERVICE from '../../services/UserServices';
import languagesData from './LanguagesData';

const Home = () => {
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [tutorsFromApi, setTutorsFromApi] = useState([]);

  useEffect(() => {
    USER_SERVICE.getAllTutors().then((tutors) => {
      if (!tutors.serviceError) {
        setTutorsFromApi(tutors);
      }
    });
  }, []);

  const onSearchInputChange = (searchInput) => {
    let filteredTutors = [];
    for (let i = 0; i < tutorsFromApi.length; i++) {
      const courses = tutorsFromApi[i].coursesTaught?.courses
        ? tutorsFromApi[i].coursesTaught?.courses
        : 0;
      for (let j = 0; j < courses.length; j++) {
        courses[j].courseName
          .toLowerCase()
          .includes(searchInput.toLowerCase()) &&
          filteredTutors.push(tutorsFromApi[i]);
      }
    }

    searchInput && filteredTutors.length === 0 && (filteredTutors = []);
    !searchInput && (filteredTutors = []);

    setFilteredTutors(() => filteredTutors);
  };

  return (
    <div className='homepage-container'>
      <div className='landingPageImg'></div>
      <div className='text-gradient-mint-blue-dark'>
        <h1 className='home-page-h1'>/h1>
        <h2> →</h2>
      </div>
      <div className='searchBar'>
        <SearchBar onSearchQueryChange={onSearchInputChange} />
          </Link>
        ))}
      </div>
      <div className='languageCardsContianer'>
        {languagesData.map((lang, i) => (
          <LanguageQuickCard
            key={lang.urlToImg}
            langName={lang.langName}
            shortLangDescription={lang.shortLangDescription}
            urlToImg={lang.urlToImg}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
