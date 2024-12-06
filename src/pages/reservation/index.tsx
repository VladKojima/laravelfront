import React, { FC, useState } from 'react';
import { TextField, Button, MenuItem, Select, useTheme, Checkbox, Typography, Modal, Box } from '@mui/material';
import { Event } from '../../models/event';
import { Hall } from '../../models/hall';
import { HallAgent } from '../../api/halls';
import { EventAgent } from '../../api/events';
import { PageCenter } from '../../components/pageCenter';
import { usePromise } from '../../hooks/usePromise';
import { Loading } from '../../components/loading';
import { useOnMount } from '../../hooks/extendedUseEffect';
import { ReservationAgent } from '../../api/reservation';
import { Reservation } from '../../models/reservation';
import { OnImageSelect } from '../../components/onImageSelect';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';

export const ReservationForm: FC = () => {
  const [hall, setHall] = useState<Hall | null>(null);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('')
  const [guestsCount, setGuestsCount] = useState<number>(1);
  const [fullHall, setFullHall] = useState(false);
  const [event, setEvent] = useState<Event | null>(null);
  const [table, setTable] = useState<number | null>(null);
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [accept, setAccept] = useState(false);

  const theme = useTheme();

  const [openTableSelector, setOpenSelector] = useState(false);

  const [getInfo, status, value] = usePromise(() => {
    return Promise.all([HallAgent.get(), EventAgent.get()]);
  });

  const [halls, events] = value !== undefined ? value : [[] as Hall[], [] as Event[]];

  useOnMount(getInfo);

  function changeHall(hall: Hall) {
    setHall(hall);
    setGuestsCount(1);
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

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

  const [submit, submitStatus] = usePromise(ReservationAgent.post)

  return (
    <PageCenter>
      <Loading status={status} onRetry={getInfo} />
      {status === "fulfilled" && <form onSubmit={handleSubmit}>
        {
          <>
            <TextField
              required
              label='Имя'
              value={guestName}
              onChange={({ target: { value } }) => setGuestName(value)}
              fullWidth
              margin='normal'
            />

            <TextField
              required
              label='Телефон'
              value={guestPhone}
              onChange={({ target: { value } }) => setGuestPhone(value)}
              fullWidth
              margin='normal'
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
            required
            variant='standard'
            value={hall?.id ?? ''}
            onChange={({ target: { value } }) => changeHall(halls.find(h => h.id === value)!)}
            sx={{
              '.MuiSelect-icon': {
                color: theme.palette.text.primary
              }
            }}
          >
            {halls.map(hall => <MenuItem key={hall.id} value={hall.id}>{hall.name}</MenuItem>)}
          </Select>
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <Checkbox
            value={fullHall}
            onChange={({ target: { checked } }) => setFullHall(checked)}
          />
          <Typography>Бронировать весь зал</Typography>
          <Button
            onClick={() => setOpenSelector(true)}
            disabled={!hall || fullHall}
          >{table ? `Столик №${table}` : "Выбрать столик"}</Button>
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
          />
          <Typography>Время</Typography>
          <TimePicker
            label="С"
            views={['hours', 'minutes']}
            timeSteps={{ minutes: 15 }}
            defaultValue={null}
            onChange={(value) => setStartTime(value?.format("hh:mm") ?? "")}
          />
          <TimePicker
            label="По"
            views={['hours', 'minutes']}
            timeSteps={{ minutes: 15 }}
            defaultValue={null}
            onChange={(value) => setEndTime(value?.format("hh:mm") ?? "")}
          />
        </Box>
        <TextField
          label="Кол-во гостей"
          type="number"
          value={guestsCount}
          onChange={(e) => setGuestsCount(+e.target.value)}
          margin="normal"
          slotProps={{
            htmlInput: {
              min: 1,
              max: hall ? hall.capacity : undefined
            }
          }}
          disabled={fullHall}
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
        <Box>
          <Typography>Согласен на обработку персональных данных</Typography>
          <Checkbox
            checked={accept}
            onChange={() => setAccept(!accept)}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!accept}
        >
          Забронировать
        </Button>
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
          <OnImageSelect
            options={[] as { value: number, x: number, y: number }[]}
            img={hall.schemeImg}
            onSelect={(value) => {
              setOpenSelector(false);
              setTable(value)
            }}
          />
        </Modal>
      }
    </PageCenter>
  );
}