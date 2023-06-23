import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';

import logo from '../assets/app-white-logo.png';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { login } from '../utility/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: 'This field has to be filled.' })
      .email('This is not a valid email.'),
    password: z.string().min(8, { message: 'Password is too short.' }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const user = await login(values);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <Card className='min-w-[30vw] max-w-[40rem] bg-background/70 -mt-20'>
        <CardHeader>
          <img src={logo} alt='logo' className='w-20 m-auto' />
          <CardTitle className='text-muted-foreground'>Login</CardTitle>
          <CardDescription>Enter your credentials to login</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
            <CardContent>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-muted-foreground'>
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='example@example.com'
                        className='text-primary'
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-muted-foreground -pt-[1rem]'>
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='password'
                        className='text-primary'
                        type='password'
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className='flex justify-end'>
              <Button type='submit'>Submit</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
