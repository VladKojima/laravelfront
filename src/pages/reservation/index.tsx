import React, { FC, useContext, useEffect, useState } from 'react';
import { TextField, Button, MenuItem, Select, useTheme, Checkbox, Typography, Modal, Box, CircularProgress, List, ListItem } from '@mui/material';
// import { Event } from '../../models/event';
import { Hall } from '../../models/hall';
import { HallAgent } from '../../api/halls';
// import { EventAgent } from '../../api/events';
import { PageCenter } from '../../components/pageCenter';
import { usePromise } from '../../hooks/usePromise';
import { Loading } from '../../components/loading';
import { useOnMount } from '../../hooks/extendedUseEffect';
import { ReservationAgent } from '../../api/reservation';
import { Reservation } from '../../models/reservation';
import { OnImageSelect } from '../../components/onImageSelect';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Table } from '../../models/table';
import { TableAgent } from '../../api/tables';
import { DishAgent } from '../../api/dishes';
import { Dish, DishTypeLabels, DishTypes } from '../../models/dish';
import { MenuSelector } from '../../components/menuSelector';
import { DishListItem } from '../../components/dishListItem';
import { Page } from '../../components/page';
import { Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { PaymentContext } from '../../utils/contexts';

interface ICartEntry {
  dish: Dish;
  count: number;
}

export const ReservationForm: FC = () => {
  const [hall, setHall] = useState<Hall | null>(null);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('')
  const [guestsCount, setGuestsCount] = useState<number>(1);
  const [fullHall, setFullHall] = useState(false);
  // const [event, setEvent] = useState<Event | null>(null);
  const [table, setTable] = useState<number | null>(null);
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [accept, setAccept] = useState(false);
  const [checked, setChecked] = useState(false);

  const theme = useTheme();

  const nav = useNavigate();

  const [, setCheck] = useContext(PaymentContext);

  const [openTableSelector, setOpenSelector] = useState(false);
  const [openDishSelector, setOpenDishSelector] = useState(false);

  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  const [getInfo, status, value] = usePromise(() => {
    return Promise.all([HallAgent.get(), /*EventAgent.get(),*/ TableAgent.get(), DishAgent.get()]);
  });

  const [halls, /*events,*/ tables, dishes] = value !== undefined ? value : [[] as Hall[], /*[] as Event[],*/[] as Table[], [] as Dish[]];

  const isDateValid = !!startDate.length && (fullHall
    ? dayjs(startDate).subtract(31, 'day').toISOString() < new Date().toISOString()
    : dayjs(startDate).subtract(7, 'day').toISOString() < new Date().toISOString());

  const isTimeValid = !!startTime.length && !!endTime.length && startTime < endTime;

  const isCountValid = (fullHall && (!hall || guestsCount <= hall!.capacity)) || (!table
    || (guestsCount <= tables.find(t => t.id === table)!.capacity
      && guestsCount > 0));

  const isValid = !!guestName.length
    && guestPhone.length
    && hall
    && (fullHall || table)
    && isDateValid
    && isTimeValid
    && isCountValid;

  useOnMount(getInfo);

  function changeHall(hall: Hall) {
    setHall(hall);
    setGuestsCount(1);
    setTable(null);
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setChecked(true);

    if (isValid)
      submit(new Reservation({
        hall_id: hall?.id,
        table_id: table ?? undefined,
        end_time: endTime,
        guests_count: guestsCount,
        reservation_date: startDate,
        start_time: startTime,
        guest_name: guestName,
        guest_phone: guestPhone
      }))
  };

  const [submit, submitStatus, submitResult] = usePromise(ReservationAgent.post);

  useEffect(() => {
    if (submitStatus === 'fulfilled') {
      localStorage.setItem('checkId', submitResult.match(/(?<=checkId=)\d*/)[0]);
      setCheck(true);
      window.open(submitResult);
      nav("/preservation/status");
    }
  }, [submitStatus])

  const nameHelper = 'Введите имя, на которое забронирован столик';
  const phoneHelper = 'Введите номер телефона для связи';

  const types = Object.keys(DishTypes)
    .filter(k => isNaN(k as any))
    .map(k => ({
      value: k,
      label: DishTypeLabels[k as any]
    }));

  const [dishCount, setDishCount] = useState(1);

  const [cart, setCart] = useState<ICartEntry[]>([]);

  function handleDishAdd() {
    if (cart.find(e => e.dish.id === selectedDish!.id)) {
      setCart(cart.map(e => {
        if (e.dish.id !== selectedDish!.id) return e;

        return {
          ...e,
          count: e.count + dishCount
        }
      }));
    }
    else {
      setCart([...cart, { dish: selectedDish!, count: dishCount }]);
    }

    setDishCount(1);

    setSelectedDish(null);
  }

  function handleInc(entry: ICartEntry) {
    setCart(cart.map(e => {
      if (e.dish.id !== entry.dish.id) return e;
      return {
        ...e,
        count: e.count + 1
      };
    }))
  }

  function handleDec(entry: ICartEntry) {
    if (entry.count === 1) return;

    setCart(cart.map(e => {
      if (e.dish.id !== entry.dish.id) return e;
      return {
        ...e,
        count: e.count - 1
      };
    }))
  }

  function handleDel(entry: ICartEntry) {
    setCart(cart.filter(e => e.dish.id !== entry.dish.id));
  }

  return (
    <PageCenter>
      <Loading status={status} onRetry={getInfo} />
      {status === "fulfilled" && <form onSubmit={handleSubmit}>
        {
          <>
            <TextField
              error={checked && checked && !guestName.length}
              label='Имя'
              value={guestName}
              onChange={({ target: { value } }) => setGuestName(value)}
              fullWidth
              margin='normal'
              helperText={(checked && !guestName.length) ? nameHelper : ''}
              disabled={submitStatus === 'pending'}
            />

            <TextField
              error={checked && checked && !guestPhone.length}
              label='Телефон'
              value={guestPhone}
              onChange={({ target: { value } }) => setGuestPhone(value)}
              fullWidth
              margin='normal'
              helperText={(checked && !guestPhone.length) ? phoneHelper : ''}
              disabled={submitStatus === 'pending'}
            />
          </>
        }
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <Typography>Зал</Typography>
          <Select
            aria-hidden={!halls.length}
            error={checked && !hall}
            variant='standard'
            value={hall?.id ?? ''}
            onChange={({ target: { value } }) => changeHall(halls.find(h => h.id === value)!)}
            sx={{
              '.MuiSelect-icon': {
                color: theme.palette.text.primary
              }
            }}
            disabled={submitStatus === 'pending'}
          >
            {halls.map(hall => <MenuItem key={hall.id} value={hall.id}>{hall.name}</MenuItem>)}
          </Select>
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          marginBottom: 2
        }}>
          <Checkbox
            value={fullHall}
            onChange={({ target: { checked } }) => setFullHall(checked)}
            disabled={submitStatus === 'pending'}
          />
          <Typography>Бронировать весь зал</Typography>
          {fullHall
            ? <Button
              onClick={() => setOpenDishSelector(true)}
              disabled={!hall || submitStatus === 'pending'}
              sx={{
                color: (checked && !fullHall && !table)
                  ? theme.palette.error.main
                  : undefined
              }}
            >Выбрать блюда</Button>
            : <Button
              onClick={() => setOpenSelector(true)}
              disabled={!hall || submitStatus === 'pending'}
              sx={{
                color: (checked && !fullHall && !table)
                  ? theme.palette.error.main
                  : undefined
              }}
            >{table ? `Столик №${tables.find(t => t.id === table)?.table_number}` : "Выбрать столик"}</Button>
          }

        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <DatePicker
            label="Дата"
            onChange={(value) => setStartDate(value?.format("YYYY-MM-DD") ?? "")}
            disablePast
            minDate={dayjs(Date.now()).add(1, 'day')}
            maxDate={
              fullHall
                ? dayjs(Date.now()).add(1, 'month')
                : dayjs(Date.now()).add(7, 'day')
            }
            disabled={submitStatus === 'pending'}
          />
          <Typography>Время</Typography>
          <TimePicker
            label="С"
            views={['hours', 'minutes']}
            minutesStep={15}
            skipDisabled
            defaultValue={null}
            onChange={(value) => setStartTime(value?.format("HH:mm") ?? "")}
            disabled={submitStatus === 'pending'}
          />
          <TimePicker
            label="По"
            views={['hours', 'minutes']}
            minutesStep={15}
            skipDisabled
            defaultValue={null}
            onChange={(value) => setEndTime(value?.format("HH:mm") ?? "")}
            disabled={submitStatus === 'pending'}
          />
        </Box>
        {
          checked && ((!startDate.length) ?
            <Typography color={theme.palette.error.main}>
              Выберите дату
            </Typography>
            : !isDateValid &&
            <Typography color={theme.palette.error.main}>
              Выберите другую дату
            </Typography>)
        }
        {
          checked && ((!startTime.length || !endTime.length) ?
            <Typography color={theme.palette.error.main}>
              Выберите промежуток времени
            </Typography>
            : !isTimeValid &&
            <Typography color={theme.palette.error.main}>
              Время начала должно быть раньше времени конца
            </Typography>)
        }
        <TextField
          error={checked && !isCountValid}
          helperText={checked && !isCountValid && 'Кол-во гостей должно умещаться за столиком'}
          label="Кол-во гостей"
          type="number"
          value={guestsCount}
          onChange={(e) => setGuestsCount(+e.target.value)}
          margin="normal"
          slotProps={{
            htmlInput: {
              min: 1,
              max: (fullHall
                ? hall?.capacity
                : tables.find(t => t.id === table)?.capacity) ?? undefined
            }
          }}
          disabled={submitStatus === 'pending'}
        />
        {/* <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
          marginBottom: 2
        }}>
          <Typography>Событие</Typography>
          <Select
            value={event?.id ?? ''}
            onChange={({ target: { value } }) => setEvent(events.find(e => e.id === value) ?? null)}
            disabled={!fullHall}
            sx={{
              '.MuiSvgIcon-root': {
                color: theme.palette.text.primary
              }
            }}
          >
            <MenuItem key={0} value={0}><Button>Убрать</Button></MenuItem>
            {events.map(event => <MenuItem key={event.id} value={event.id}>{event.name}</MenuItem>)}
          </Select>
        </Box> */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Checkbox
            checked={accept}
            onChange={() => setAccept(!accept)}
            disabled={submitStatus === 'pending'}
          />
          <Typography>
            Согласен на обработку персональных данных
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center'
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!accept || (checked && !isValid) || submitStatus === 'pending'}
          >
            Забронировать
          </Button>

          {
            submitStatus === 'pending' && <>
              <Typography>
                Идет проверка возможности брони...
              </Typography>
              <CircularProgress />
            </>
          }

          {
            submitStatus === 'fulfilled' && <Typography>
              Заявка на бронирование успешно создана. Будет выполнен переход на страницу оплаты.
            </Typography>
          }

          {
            submitStatus === 'rejected' && <Typography>
              Произошла ошибка. Повторите попытку.
            </Typography>
          }

        </Box>

      </form>}
      {
        hall && <Modal
          open={openTableSelector}
          onClose={() => setOpenSelector(false)}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box sx={{
            width: '80%',
            height: '80%'
          }}>
            <OnImageSelect
              options={tables
                .filter(table => table.is_available && table.hall_id === hall.id)
                .map(table => ({
                  x: table.x,
                  y: table.y,
                  label: table.table_number.toString(),
                  value: table.id
                }))
              }
              img={hall.schemeImg}
              onSelect={(value) => {
                setOpenSelector(false);
                setTable(value)
              }}
              PopperComponent={({ option }) => <Box
                sx={{
                  backgroundColor: theme.palette.text.primary,
                  padding: 2,
                  borderRadius: 5
                }}
              >
                <Typography>Столик №{option.label}</Typography>
                <Typography>Вместимость: {tables.find(t => t.id === option.value)?.capacity}</Typography>
              </Box>}
            />
          </Box>
        </Modal>
      }

      <Modal
        open={openDishSelector}
        onClose={() => setOpenDishSelector(false)}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            width: '80%'
          }}
        >
          <Page>
            <Box
              sx={{
                height: '50vh'
              }}
            >

              <MenuSelector
                keygen={(dish) => dish.id}
                OptionComponent={DishListItem}
                types={types}
                options={dishes!.map(dish => ({
                  value: dish,
                  type: types.find(t => t.value === dish.type as any)!,
                  image: dish.image
                }))
                }
                onClick={setSelectedDish}
              />
            </Box>

            <Box
              sx={{
                display: 'flex'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  alignItems: 'center',
                  flexDirection: 'column',
                  width: "50%"
                }}
              >
                <Typography
                  sx={{
                    wordBreak: 'break-all'
                  }}
                >Выбранное блюдо: {selectedDish?.title}</Typography>
                <TextField
                  label="Кол-во"
                  value={dishCount}
                  type='number'
                  onChange={({ target: { value } }) => setDishCount(+value)}
                  slotProps={{
                    htmlInput: {
                      min: 1
                    }
                  }}
                />
                <Button
                  onClick={handleDishAdd}
                  disabled={!selectedDish || dishCount < 1}
                >Добавить</Button>
              </Box>

              <List
                sx={{
                  width: '60%',
                  height: '30vh',
                  overflowY: 'scroll',
                }}
              >
                {cart.map(e => <ListItem
                  key={e.dish.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography
                    sx={{
                      wordBreak: 'break-all',
                    }}
                  >{e.dish.title}</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',

                    }}
                  >
                    <Button
                      sx={{
                        borderRadius: '50%'
                      }}
                      onClick={() => handleDec(e)}
                    >-</Button>
                    <Typography>
                      {e.count}
                    </Typography>
                    <Button
                      sx={{
                        borderRadius: '50%'
                      }}
                      onClick={() => handleInc(e)}
                    >+</Button>
                    <Button
                      sx={{
                        borderRadius: '50%'
                      }}
                      onClick={() => handleDel(e)}
                    >
                      <Delete />
                    </Button>
                  </Box>

                </ListItem>)}
              </List>

            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}
            >
              <Typography>Итого {cart
                .map(e => e.dish.cost * e.count)
                .reduce((sum, dish) => sum + dish, 0) * guestsCount} руб.</Typography>
              <Button
                onClick={() => setOpenDishSelector(false)}
              >Ок</Button>
            </Box>
          </Page>
        </Box>
      </Modal >
    </PageCenter >
  );
}