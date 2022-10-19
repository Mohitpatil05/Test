import { View, Text, Switch, TouchableOpacity, TextComponent } from 'react-native';
import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const App = ({ navigation }) => {
  let data = {
    Exam_Fee: {
      INDIAN: {
        Medical: {
          amount: 400,
        },
        Dental: {
          amount: 400,
        },
        Aayrveda: {
          amount: 400,
        },
      },
      FOREIGN: {
        Medical: {
          amount: 100,
        },
        Dental: {
          amount: 100,
        },
        Aayrveda: {
          amount: 100,
        },
      },
      NRI: {
        Medical: {
          amount: 600,
        },
        Dental: {
          amount: 600,
        },
        Aayrveda: {
          amount: 600,
        },
      },
      SAARC: {
        Medical: {
          amount: 600,
        },
        Dental: {
          amount: 600,
        },
        Aayrveda: {
          amount: 6400,
        },
      },
    },
    Application_Fee: {
      INDIAN: {
        Medical: {
          UG: {
            amount: 200,
          },
          'UG-DIPLOMA': {
            amount: 300,
          },
          PG: {
            amount: 500,
          },
        },
        Dental: {
          UG: {
            amount: 200,
          },
          'UG-DIPLOMA': {
            amount: 300,
          },
          PG: {
            amount: 500,
          },
        },
        Aayurveda: {
          UG: {
            amount: 200,
          },
          'UG-DIPLOMA': {
            amount: 300,
          },
          PG: {
            amount: 500,
          },
        },
      },
      FOREIGN: {
        Medical: {
          UG: {
            amount: 400,
          },
          'UG-DIPLOMA': {
            amount: 400,
          },
          PG: {
            amount: 700,
          },
        },
        Dental: {
          UG: {
            amount: 400,
          },
          'UG-DIPLOMA': {
            amount: 400,
          },
          PG: {
            amount: 700,
          },
        },
        Aayurveda: {
          UG: {
            amount: 400,
          },
          'UG-DIPLOMA': {
            amount: 400,
          },
          PG: {
            amount: 700,
          },
        },
      },
    },
  };
  const Color = {
    primary: '#8591FF',
    white: '#fff',
    dark: '#EFEFEF',
    gray: '#242424',
    Stock: '#242424',
    fillColor: '#363636'
  }
  const [feeOpen, setfeeOpen] = useState(false);
  const [feetype, setfeetype] = useState(null);

  const [nationalityOpen, setNationalityOpen] = useState(false);
  const [nationalitype, setNationalitytype] = useState(null);

  const [nationality, setNationality] = useState([]);

  const [course, setCourse] = useState([]);
  const [courseOpen, setCourseOpen] = useState(false);
  const [coursetype, setCourseType] = useState(null);

  const [amount, setAmount] = useState([]);
  const [amountOpen, setAmountOpen] = useState(false);
  const [amounttype, setAmountType] = useState(null);

  const [cost, setCost] = useState([]);

  const [appFee, setAppFee] = useState([]);

  useEffect(() => {
    getSubCategory(feetype);
    getCourses(feetype, nationalitype);
    getAmount(feetype, nationalitype, coursetype);
    getCost(feetype, nationalitype, coursetype, amounttype);
  }, [feetype, nationalitype, coursetype, amounttype]);

  const getSubCategory = value => {
    if (value) {
      let Data = Object.keys(data[value]);
      setNationality(
        Data.map(item =>
          // console.log("009",item),
          ({ label: item, value: item }),
        ),
      );
    } else {
      return;
    }
  };
  const getCourses = (value, datas) => {
    if (value && datas) {
      let Data = Object.keys(data[value][datas]);
      setCourse(Data.map(item => ({ label: item, value: item })));
    } else {
      return;
    }
  };
  const getAmount = (value, datas, crs) => {
    if (value && datas && crs) {
      let Data = Object.keys(data[value][datas][crs]);
      setAmount(Data.map(item => ({ label: item, value: item })));
    } else {
      return;
    }
  };
  const getCost = (value, datas, crs, amt) => {
    if (value && datas && crs && amt) {
      if (amt == 'amount') {
        setCost(data[value][datas][crs][amt]);
      } else {
        let DATA = Object.keys(data[value][datas][crs][amt]);
        setAppFee(
          DATA.map(
            item => (
              console.log('item==>', item),
              setCost(data[value][datas][crs][amt][item])
            ),
          ),
        );
        console.log('UNDER GRADUATION');
      }
    } else {
      return;
    }
  };

  const feetypedata = [
    Object.keys(data).map(item => ({ label: item, value: item })),
  ];
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',

        backgroundColor: isEnabled ? Color.gray : Color.white,
        margin: -10,
      }}>
      <View style={{ position: 'absolute', top: 10, right: 10, flexDirection: 'row', alignItems: 'center' }}>
        <View>
          <Text style={{ fontWeight: '900', color: !isEnabled ? Color.gray : Color.white }}>Dark Mode</Text>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "white" }}
          thumbColor={isEnabled ? "#767577" : Color.gray}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={{ width: '95%' }}>
        <DropDownPicker
          items={feetypedata[0]}
          value={feetype}
          zIndex={0}
          setValue={setfeetype}
          mode="BADGE"
          showBadgeDot={false}
          placeholder="Select Fees"
          setOpen={setfeeOpen}
          listMode={'MODAL'}
          labelStyle={{ color: isEnabled ? Color.white : Color.gray }}
          placeholderStyle={{
            color: isEnabled ? Color.white : Color.gray
          }}
          selectedItemContainerStyle={{
            backgroundColor: Color.primary,
          }}
          autoScroll={false}
          open={feeOpen}
          style={{
            marginVertical: 8,
            borderColor: !isEnabled ? Color.Stock : '#929196',
            backgroundColor: isEnabled ? Color.fillColor : '#fbfaff',
            borderRadius: 10,
            width: '100%'
          }}
        />
      </View>
      <View style={{ paddingVertical: 0 }}>
        {nationality ? (
          <View style={{ width: '95%' }}>
            <DropDownPicker
              items={nationality}
              value={nationalitype}
              setValue={setNationalitytype}
              placeholder="Select Nationality"
              mode="BADGE"
              showBadgeDot={false}
              setOpen={setNationalityOpen}
              listMode={'MODAL'}
              closeAfterSelecting={true}
              selectedItemContainerStyle={{
                backgroundColor: Color.primary,
              }}
              labelStyle={{ color: isEnabled ? Color.white : Color.gray }}
              placeholderStyle={{
                color: isEnabled ? Color.white : Color.gray,
              }}
              autoScroll={false}
              open={nationalityOpen}
              style={{
                marginVertical: 8,
                borderColor: !isEnabled ? Color.Stock : '#929196',
                backgroundColor: isEnabled ? Color.fillColor : '#fbfaff',
                borderRadius: 10,
                width: '100%'
              }}
            />
          </View>
        ) : (
          <></>
        )}
      </View>
      {course ? (
        <View style={{ width: '95%' }}>
          <DropDownPicker
            items={course}
            value={coursetype}
            setValue={setCourseType}
            mode="BADGE"
            showBadgeDot={false}
            setOpen={setCourseOpen}
            placeholder={'Select Cousess'}
            listMode={'MODAL'}
            selectedItemContainerStyle={{
              backgroundColor: Color.primary,
            }}
            labelStyle={{ color: isEnabled ? Color.white : Color.gray }}
            placeholderStyle={{
              color: isEnabled ? Color.white : Color.gray
            }}
            autoScroll={false}
            open={courseOpen}
            style={{
              marginVertical: 8,
              width: '100%',
              borderColor: !isEnabled ? Color.Stock : '#929196',
              backgroundColor: isEnabled ? Color.fillColor : '#fbfaff',
              borderRadius: 10,
            }}
          />
        </View>
      ) : (
        <></>
      )}
      {amount != '' ? (
        <View style={{ width: '95%' }}>
          <DropDownPicker
            items={amount}
            value={amounttype}
            setValue={setAmountType}
            mode="BADGE"
            showBadgeDot={false}
            setOpen={setAmountOpen}
            listMode={'MODAL'}
            selectedItemContainerStyle={{
              backgroundColor: Color.primary,
            }}
            labelStyle={{ color: isEnabled ? Color.white : Color.gray }}
            placeholderStyle={{
              color: isEnabled ? Color.white : Color.gray
            }}
            autoScroll={false}
            open={amountOpen}
            style={{
              marginVertical: 12,
              width: '100%',
              borderColor: !isEnabled ? Color.Stock : '#929196',
              backgroundColor: isEnabled ? Color.fillColor : '#fbfaff',
              borderRadius: 10,
            }}
          />
        </View>
      ) : (
        <></>
      )}
      {cost ? (
        <View
          style={{
            marginTop: 20,
            backgroundColor: cost ? Color.primary : Color.white,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            paddingHorizontal: 100,
            borderRadius: 10,
          }}>
          <Text
            style={{
              justifyContent: 'center',
              color: '#fff',
              fontSize: 18,
              fontWeight: '700',
            }}>
            {' '}
            Costing:-{' '}
            <Text style={{ fontWeight: '900', fontSize: 18 }}>{cost}</Text>
          </Text>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default App;
