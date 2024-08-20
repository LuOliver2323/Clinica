using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Serialization;
using Clinica.Domain.Entidades;
using Clinica.Infrastructure.Data.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Clinica.Domain.Interfaces;
using Clinica.Service.services;
using Clinica.Infrastructure.Data.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Clinica.Application.Model;
using Clinica.Service;

namespace Clinica.Application
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Clinica.Application", Version = "v1" });
            });

            services.AddDbContext<SqlServerContext>(); //contexto
            services.AddControllers().AddNewtonsoftJson(); //json
            services.AddMvc().AddNewtonsoftJson(opt =>
            {

                opt.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;

            });
            services.AddSingleton(new MapperConfiguration(config =>
            {
                config.CreateMap<PacienteModel, Paciente>();
                config.CreateMap<Paciente, PacienteModel>();

                config.CreateMap<ContatoModel, Contato>();
                config.CreateMap<Contato, ContatoModel>();

                config.CreateMap<ProfissionalModel, Profissional>();
                config.CreateMap<Profissional, ProfissionalModel>();

                config.CreateMap<EspecialidadeModel, Especialidade>();
                config.CreateMap<Especialidade, EspecialidadeModel>();

                config.CreateMap<LogradouroModel, Logradouro>();
                config.CreateMap<Logradouro, LogradouroModel>();

                config.CreateMap<ContasPagarModel, ContasPagar>();
                config.CreateMap<ContasPagar, ContasPagarModel>();

                config.CreateMap<ResponsavelModel, Responsavel>();
                config.CreateMap<Responsavel, ResponsavelModel>();

                config.CreateMap<FormaPagamentoModel, FormaPagamento>();
                config.CreateMap<FormaPagamento, FormaPagamentoModel>();

                config.CreateMap<CondicaoPagamentoModel, CondicaoPagamento>();
                config.CreateMap<CondicaoPagamento, CondicaoPagamentoModel>();

                //config.CreateMap<BaixaContasPagarModel, BaixaContasPagar>();
                //config.CreateMap<BaixaContasPagar, BaixaContasPagarModel>();

                config.CreateMap<Usuario, UsuarioModel>();
                config.CreateMap<UsuarioModel, Usuario>();


            }).CreateMapper());

            //injecao de dependencia
            services.AddScoped<IBaseService<Paciente>, BaseService<Paciente>>();
            services.AddScoped<IBaseRepository<Paciente>, BaseRepository<Paciente>>();

            services.AddScoped<IBaseService<Contato>, BaseService<Contato>>();
            services.AddScoped<IBaseRepository<Contato>, BaseRepository<Contato>>();

            services.AddScoped<IBaseService<Profissional>, BaseService<Profissional>>();
            services.AddScoped<IBaseRepository<Profissional>, BaseRepository<Profissional>>();

            services.AddScoped<IBaseService<Especialidade>, BaseService<Especialidade>>();
            services.AddScoped<IBaseRepository<Especialidade>, BaseRepository<Especialidade>>();

            services.AddScoped<IBaseService<Logradouro>, BaseService<Logradouro>>();
            services.AddScoped<IBaseRepository<Logradouro>, BaseRepository<Logradouro>>();

            services.AddScoped<IBaseService<ContasPagar>, BaseService<ContasPagar>>();
            services.AddScoped<IBaseRepository<ContasPagar>, BaseRepository<ContasPagar>>();

            services.AddScoped<IBaseService<Responsavel>, BaseService<Responsavel>>();
            services.AddScoped<IBaseRepository<Responsavel>, BaseRepository<Responsavel>>();

            services.AddScoped<IBaseService<FormaPagamento>, BaseService<FormaPagamento>>();
            services.AddScoped<IBaseRepository<FormaPagamento>, BaseRepository<FormaPagamento>>();

            services.AddScoped<IBaseService<CondicaoPagamento>, BaseService<CondicaoPagamento>>();
            services.AddScoped<IBaseRepository<CondicaoPagamento>, BaseRepository<CondicaoPagamento>>();

            //services.AddScoped<IBaseService<BaixaContasPagar>, BaseService<BaixaContasPagar>>();
            //services.AddScoped<IBaseRepository<BaixaContasPagar>, BaseRepository<BaixaContasPagar>>();

            services.AddScoped<IBaseService<Usuario>, BaseService<Usuario>>();
            services.AddScoped<IBaseRepository<Usuario>, BaseRepository<Usuario>>();

            services.AddCors(); // Make sure you call this previous to AddMvc
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);


            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,

                        ValidIssuer = Configuration["Jwt:Issuer"],
                        ValidAudience = Configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey
                      (Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                    };
                });
            services.AddSingleton<IConfiguration>(Configuration);


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Clinica.Application v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();


            app.UseCors(builder =>
            {
                builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
            });

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
